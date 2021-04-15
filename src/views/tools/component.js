import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    MenuItem,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@material-ui/core';
import {AddBoxSharp} from '@material-ui/icons';
import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from 'react-redux';
import gfm from 'remark-gfm';

import {
    selectAvailableTools,
    selectNumberOfTools,
    selectParameters,
    selectResults,
    selectToolName
} from '../../api/tools/selectors';
import {thunks as toolsThunks} from '../../api/tools/thunks';
import {saveFile} from '../../helpers/file-helpers';
import {FileItemProvider} from '../../utils/file-context';
import {createParameterInput} from '../../utils/parameter-factory';
import {cardActionStyles, useStyles} from './styles';

const createParameterInputFields = (parameters, inputItemClasses) => parameters &&
    parameters.map((parameter) => {
        const gritItemProps =
            parameter.dataType === 'PARAMETERSET'
                ? {
                    lg: 9,
                    sm: 12,
                    xs: 12
                }
                : {
                    lg: 3,
                    sm: 4,
                    xs: 12
                };
        return (
            <Grid
                item
                key={parameter.name}
                lg={gritItemProps.lg}
                sm={gritItemProps.sm}
                xs={gritItemProps.xs}
            >
                {createParameterInput(parameter, inputItemClasses)}
            </Grid>
        );
    });

const TabPanel = (props) => {
    const {children, value, index} = props;

    return (
        <div
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            role="tabpanel"
        >
            {value === index &&
                <Box p={3}>
                    <Typography component="div">
                        {children}
                    </Typography>
                </Box>}
        </div>
    );
};

export const ToolsView = () => {
    const classes = useStyles();
    const cardActionClasses = cardActionStyles();
    const dispatch = useDispatch();
    const [selectedTool, setSelectedTool] = useState(0);
    const [openHelpText, setOpenHelpText] = useState(false);
    const [openCitation, setOpenCitation] = useState(false);
    const availableTools = useSelector(selectAvailableTools);
    const parameters = useSelector(selectParameters);
    const results = useSelector(selectResults);
    const {handleSubmit, ...formProperties} = useForm();
    const [fileItems, setFileItems] = useState({});
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        if (!availableTools) {
            dispatch(toolsThunks.tools.fetch());
        }
    }, [availableTools, dispatch]);

    const onSubmit = useCallback(
        (values) => {
            console.log(values, fileItems);

            if (availableTools[selectedTool] && Object.keys(values).length > 0) {
                dispatch(toolsThunks.tools.execute({
                    files: Object.values(fileItems),
                    tool: availableTools[selectedTool].type,
                    values
                }));
            }
        },
        [availableTools, dispatch, fileItems, selectedTool]
    );

    const handleFileItemsChange = useCallback(
        (updatedFileItems) => {
            setFileItems(updatedFileItems);
        },
        [setFileItems]
    );

    const handleToolSelectionChange = useCallback(
        (event) => {
            const newSelectedTool = event.target.value;
            setSelectedTool(newSelectedTool);
        },
        [setSelectedTool]
    );

    const handleToggleHelpText = useCallback(() => {
        setOpenHelpText(!openHelpText);
    }, [openHelpText, setOpenHelpText]);

    const handleToggleCitation = useCallback(() => {
        setOpenCitation(!openCitation);
    }, [openCitation, setOpenCitation]);

    const handleSectionChange = useCallback(
        (event, newSelectedSection) => {
            setSelectedSection(newSelectedSection);
        },
        [setSelectedSection]
    );

    const handleLoadToolClick = useCallback(() => {
        if (availableTools && availableTools[selectedTool] && availableTools[selectedTool].type) {
            dispatch(toolsThunks.parameterSet.fetch(availableTools[selectedTool].type));
        }
    }, [availableTools, selectedTool, dispatch]);

    const createResultClickHandler = useCallback((resultFile) => () => {
        console.log(resultFile);
        saveFile({name: resultFile});
    }, []);

    return (
        <Grid
            container
            direction="column"
            spacing={3}
        >
            <Grid item>
                {availableTools &&
                    <TextField
                        helperText="Please select a tool"
                        label="Tool Selection"
                        onChange={handleToolSelectionChange}
                        select
                        value={selectedTool}
                        variant="filled"
                    >
                        {availableTools.map(({type, name}, toolIndex) => <MenuItem
                            key={type}
                            value={toolIndex}
                        >
                            {name}
                        </MenuItem>)}
                    </TextField>}
            </Grid>
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                        >
                            {availableTools && availableTools[selectedTool].type}
                        </Typography>
                        <Typography
                            component="h2"
                            variant="h5"
                        >
                            {availableTools && availableTools[selectedTool].name}
                        </Typography>
                        <Typography color="textSecondary">
                            {'Version: '}
                            {availableTools && availableTools[selectedTool].version}
                        </Typography>
                        <Typography
                            component="p"
                            variant="body2"
                        >
                            {availableTools && availableTools[selectedTool].description}
                        </Typography>
                    </CardContent>
                    <CardActions className={cardActionClasses.root}>
                        <Button
                            onClick={handleLoadToolClick}
                            size="small"
                        >
                            Load Tool
                        </Button>
                        {availableTools && availableTools[selectedTool].helpText &&
                            <Button
                                onClick={handleToggleHelpText}
                                size="small"
                            >
                                Show Help Text
                            </Button>}
                        {availableTools && availableTools[selectedTool].references &&
                            <Button
                                onClick={handleToggleCitation}
                                size="small"
                            >
                                Show Citation
                            </Button>}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Paper>
                    <Paper
                        elevation={2}
                        square
                    >
                        <Tabs
                            onChange={handleSectionChange}
                            value={selectedSection}
                        >
                            <Tab label="Parameters" />
                            <Tab label="Results" />
                        </Tabs>
                    </Paper>
                    <Box
                        hidden={selectedSection !== 0}
                        p={2}
                    >
                        <FormProvider
                            {...formProperties}
                            handleSubmit={handleSubmit}
                        >
                            <FileItemProvider onChange={handleFileItemsChange}>
                                <form
                                    className={classes.form}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Grid
                                        alignContent="flex-start"
                                        container
                                        justify="center"
                                        spacing={2}
                                    >
                                        {createParameterInputFields(parameters, classes.inputItem)}
                                        <Grid
                                            item
                                            xs={12}
                                        >
                                            <Button
                                                color="primary"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </FileItemProvider>
                        </FormProvider>
                    </Box>
                    <Box
                        hidden={selectedSection !== 1}
                        p={2}
                    >
                        {results &&
                            <List>
                                {results.map((result) => <ListItem
                                    button
                                    key={result}
                                    onClick={createResultClickHandler(result)}
                                >
                                    {result}
                                </ListItem>)}
                            </List>}
                    </Box>
                </Paper>
            </Grid>
            <Dialog
                fullWidth
                maxWidth="md"
                onBackdropClick={handleToggleHelpText}
                open={openHelpText}
            >
                <DialogTitle>
                    Help Text
                </DialogTitle>
                <DialogContent>
                    <ReactMarkdown plugins={[gfm]}>
                        {availableTools && availableTools[selectedTool].helpText}
                    </ReactMarkdown>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleToggleHelpText}
                        size="small"
                    >
                        Close Help Text
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth
                maxWidth="md"
                onBackdropClick={handleToggleCitation}
                open={openCitation}
            >
                <DialogTitle>
                    Citation
                </DialogTitle>
                <DialogContent>
                    {availableTools &&
                        availableTools[selectedTool].references &&
                        availableTools[selectedTool].references.map((reference) => <pre key={btoa(reference)}>
                            <code>
                                {reference}
                            </code>
                        </pre>)}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleToggleCitation}
                        size="small"
                    >
                        Close Citation
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
