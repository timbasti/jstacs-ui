import {Box, Button, Drawer, Grid, IconButton, Tabs, Toolbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React, {useCallback, useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from 'react-redux';
import remarkGfm from 'remark-gfm';

import {startToolExecution} from '../../../../api/toolExecutions/thunks';
import {selectSelectedToolParameters} from '../../../../api/tools/selectors';
import {ParameterGrid} from '../../../../components/parameter-grid/component';
import {startExecutionStyles} from './styles';

const StartExecution = ({helpText, toolId}) => {
    const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
    const selectedToolParameters = useSelector(selectSelectedToolParameters);
    const {handleSubmit, ...formProperties} = useForm();
    const dispatch = useDispatch();

    const renderedParameterGrid = useMemo(() => {
        return selectedToolParameters && <ParameterGrid parameters={selectedToolParameters} />;
    }, [selectedToolParameters]);

    const doSubmit = useCallback(
        (values) => {
            if (!values || !toolId) {
                return;
            }
            console.log('doSubmit', values);

            dispatch(startToolExecution({
                toolId,
                values
            }));
        },
        [dispatch, toolId]
    );

    const handleHelpDrawerToggle = useCallback(() => {
        setHelpDrawerOpen(!helpDrawerOpen);
    }, [helpDrawerOpen]);

    const handleFormSubmit = useMemo(() => {
        return handleSubmit(doSubmit);
    }, [handleSubmit, doSubmit]);

    const classes = startExecutionStyles();

    return (
        <Box className={helpDrawerOpen ? `${classes.root}-withHelpText` : classes.root}>
            <FormProvider
                {...formProperties}
                handleSubmit={handleSubmit}
            >
                <form
                    noValidate
                    onSubmit={handleFormSubmit}
                >
                    {renderedParameterGrid}
                    <Box marginTop={3}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Start Execution
                        </Button>
                    </Box>
                </form>
            </FormProvider>
            <Drawer
                PaperProps={{className: classes.helpText}}
                anchor="right"
                open={helpDrawerOpen}
                variant="persistent"
            >
                <Toolbar />
                <Tabs />
                <Box
                    className={classes.helpTextContent}
                    p={3}
                >
                    <ReactMarkdown plugins={[remarkGfm]}>
                        {helpText}
                    </ReactMarkdown>
                </Box>
                <Box p={3}>
                    <Button
                        onClick={handleHelpDrawerToggle}
                        variant="outlined"
                    >
                        Close
                    </Button>
                </Box>
            </Drawer>
            <IconButton
                className={classes.helpTextTrigger}
                onClick={handleHelpDrawerToggle}
            >
                <HelpOutlineIcon />
            </IconButton>
        </Box>
    );
};

export {StartExecution};
