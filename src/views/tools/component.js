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
    MenuItem,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@material-ui/core';
import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from 'react-redux';
import gfm from 'remark-gfm';

import {selectAvailableTools, selectNumberOfTools, selectParameters, selectToolName} from '../../api/tools/selectors';
import {thunks as toolsThunks} from '../../api/tools/thunks';
import {FileItemContext, fileItemReducer} from '../../utils/file-context';
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
    const {handleSubmit, ...formProperties} = useForm();
    const [fileItems, setFileItem] = useReducer(fileItemReducer, {});
    const fileContext = useMemo(
        () => ({
            fileItems,
            setFileItem
        }),
        [fileItems, setFileItem]
    );
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        if (!availableTools) {
            dispatch(toolsThunks.tools.fetch());
        }
    }, [availableTools, dispatch]);

    const onSubmit = (formData) => {
        if (Object.keys(formData).length > 0) {
            dispatch(toolsThunks.parameterSet.post(selectedTool));
        }
    };

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

    return (
        <Box>
            <Box component="p">
                A view to show available tools and to load the parameters.
            </Box>

            {availableTools &&
                <TextField
                    helperText="Please select a tool"
                    label="Tool Selection"
                    onChange={handleToolSelectionChange}
                    select
                    value={selectedTool}
                    variant="filled"
                >
                    {availableTools.map(({type, toolName}, toolIndex) => <MenuItem
                        key={type}
                        value={toolIndex}
                    >
                        {toolName}
                    </MenuItem>)}
                </TextField>}

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
                        {availableTools && availableTools[selectedTool].toolName}
                    </Typography>

                    <Typography color="textSecondary">
                        {'Version: '}

                        {availableTools && availableTools[selectedTool].toolVersion}
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

            <Paper>
                <Tabs
                    onChange={handleSectionChange}
                    value={selectedSection}
                >
                    <Tab label="Parameters" />

                    <Tab label="Results" />
                </Tabs>

                <TabPanel
                    index={0}
                    value={selectedSection}
                >
                    <FormProvider
                        {...formProperties}
                        handleSubmit={handleSubmit}
                    >
                        <FileItemContext.Provider value={fileContext}>
                            <form
                                className={classes.form}
                                onSubmit={handleSubmit()}
                            >
                                <Grid
                                    alignContent="flex-start"
                                    container
                                    justify="center"
                                    spacing={5}
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
                        </FileItemContext.Provider>
                    </FormProvider>
                </TabPanel>

                <TabPanel
                    index={1}
                    value={selectedSection}
                >
                    Fancy Results
                </TabPanel>
            </Paper>

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
        </Box>
    );
};
