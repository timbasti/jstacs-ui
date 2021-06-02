import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Paper,
    Slide,
    Typography
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from 'react-redux';
import remarkGfm from 'remark-gfm';

import {startToolExecution} from '../../../../api/toolExecutions/thunks';
import {selectSelectedToolParameters} from '../../../../api/tools/selectors';
import {EnrichedTextField} from '../../../../components/input-fields';
import {ParameterGrid} from '../../../../components/parameter-grid/component';
import {useAppHeaderControlsContext} from '../../../../utils/contexts/app-header-controls-context';
import {helpTextDrawerStyles, startExecutionStyles} from './styles';

const ExecutionInformation = () => {
    return (
        <Paper
            bgcolor="unset"
            component={Box}
            p={2}
            variant="outlined"
        >
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        component="h2"
                        variant="h6"
                    >
                        General Information
                    </Typography>
                </Grid>
                <Grid
                    item
                    sm={4}
                    xs={12}
                >
                    <EnrichedTextField
                        helperText="You can add a Name"
                        label="Execution Name"
                        name="executionInformation.name"
                        placeholder="Enter a name"
                    />
                </Grid>
                <Grid
                    item
                    sm={8}
                    xs={12}
                >
                    <EnrichedTextField
                        helperText="You can add some execution notes"
                        label="Execution Notes"
                        multiline
                        name="executionInformation.notes"
                        placeholder="Enter a text"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

const ExecutionParameters = () => {
    const selectedToolParameters = useSelector(selectSelectedToolParameters);

    const renderedTitleComponent = useMemo(() => {
        return (
            <Typography
                component="h2"
                gutterBottom
                variant="h6"
            >
                Execution Parameters
            </Typography>
        );
    }, []);

    const renderedParameterGrid = useMemo(() => {
        return (
            selectedToolParameters &&
            renderedTitleComponent &&
                <ParameterGrid
                    parameters={selectedToolParameters}
                    parentName="executionParameters"
                    titleComponent={renderedTitleComponent}
                />

        );
    }, [renderedTitleComponent, selectedToolParameters]);

    return (
        <Card
            bgcolor="unset"
            component={Box}
            variant="outlined"
        >
            <CardContent>
                {renderedParameterGrid}
            </CardContent>
        </Card>
    );
};

const ExecutionForm = ({toolId}) => {
    const dispatch = useDispatch();

    const {handleSubmit, ...formProperties} = useForm();

    const doSubmit = useCallback(
        (values) => {
            if (!values || !toolId) {
                return;
            }

            dispatch(startToolExecution({
                toolId,
                values
            }));
        },
        [dispatch, toolId]
    );

    const handleFormSubmit = useMemo(() => {
        return handleSubmit(doSubmit);
    }, [handleSubmit, doSubmit]);

    return (
        <Box p={3}>
            <FormProvider
                {...formProperties}
                handleSubmit={handleSubmit}
            >
                <Grid
                    component="form"
                    container
                    noValidate
                    onSubmit={handleFormSubmit}
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <ExecutionInformation />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <ExecutionParameters />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Start Execution
                        </Button>
                    </Grid>
                </Grid>
            </FormProvider>
        </Box>
    );
};

const HelpTextDrawer = ({helpText, open}) => {
    const classes = helpTextDrawerStyles();

    const cleanedHelpText = useMemo(() => {
        const regex = /^\.\.\s+_(?<linkKey>.*?)\s*:\s*(?<linkTarget>.*)$/gmu;
        let newHelpText = helpText;
        let linkDef = null;
        while ((linkDef = regex.exec(helpText)) !== null) {
            const {0: line, groups: {linkKey, linkTarget}} = linkDef;
            newHelpText = newHelpText.replace(`${linkKey}_`, `[${linkKey}](${linkTarget})`);
            newHelpText = newHelpText.replace(line, '');
        }
        return newHelpText;
    }, [helpText]);

    return (
        <Slide
            className={classes.root}
            direction="left"
            in={open}
            mountOnEnter
            unmountOnExit
        >
            <Paper
                square
                variant="outlined"
            >
                <Box
                    className={classes.helpTextContent}
                    p={3}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {cleanedHelpText}
                    </ReactMarkdown>
                </Box>
            </Paper>
        </Slide>
    );
};

const StartExecution = ({helpText, toolId}) => {
    const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
    const {setControls} = useAppHeaderControlsContext();

    const handleHelpDrawerToggle = useCallback(() => {
        setHelpDrawerOpen(!helpDrawerOpen);
    }, [helpDrawerOpen]);

    const classes = startExecutionStyles();

    useEffect(() => {
        setControls([
            <IconButton
                color="inherit"
                key="helpTextTrigger"
                onClick={handleHelpDrawerToggle}
            >
                <HelpOutlineIcon />
            </IconButton>
        ]);
    }, [setControls, handleHelpDrawerToggle]);

    return (
        <Box
            height="100%"
            width="100%"
        >
            <Grid
                className={classes.root}
                container
                wrap="nowrap"
            >
                <Grid
                    className={classes.item}
                    item
                >
                    <ExecutionForm toolId={toolId} />
                </Grid>
                <Grid
                    className={classes.item}
                    item
                >
                    <HelpTextDrawer
                        helpText={helpText}
                        open={helpDrawerOpen}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export {StartExecution};
