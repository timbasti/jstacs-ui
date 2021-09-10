/* eslint-disable max-lines */
/* eslint-disable no-case-declarations */

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import {getFileUrl} from '../../../../../api/files/requests';
import {selectLoadedToolExecution, toolExecutionStates} from '../../../../../api/toolExecutions/selectors';
import {loadToolExecution} from '../../../../../api/toolExecutions/thunks';
import {ParameterValueViewer} from './components/parameter-value-viewer/component';
import {TabularResult} from './components/results/tabular-result/component';
import {
    useExecutionOverviewStyles,
    useGeneralInformationStyles,
    useProtocolDialogStyles,
    useResultsAreaStyles,
    useResultStyles,
    useTitleBarStyles
} from './styles';

const NameTypography = ({name}) => {
    return (
        <Box>
            <Typography
                color="textSecondary"
                component="span"
            >
                {'Name: '}
            </Typography>
            <Typography
                component="span"
                variant="body2"
            >
                {name}
            </Typography>
        </Box>
    );
};

const CreatedAtTypography = ({createdAt}) => {
    return (
        <Box>
            <Typography
                color="textSecondary"
                component="span"
            >
                {'Created at: '}
            </Typography>
            <Typography
                component="span"
                variant="body2"
            >
                {createdAt}
            </Typography>
        </Box>
    );
};

const StateTypography = ({state}) => {
    return (
        <Box>
            <Typography
                color="textSecondary"
                component="span"
            >
                {'State: '}
            </Typography>
            <Typography
                component="span"
                variant="body2"
            >
                {state}
            </Typography>
        </Box>
    );
};

const ProgressTypography = ({progress, state}) => {
    const progressAsText = useMemo(() => {
        if (state === toolExecutionStates.INITIALIZED || state === toolExecutionStates.PENDING) {
            const cleanedProgress = progress < 0 ? 0 : progress;
            return `${cleanedProgress * 100}%`;
        }
        const cleanedProgress = progress < 0 ? 1 : progress;
        return `${cleanedProgress * 100}%`;
    }, [progress, state]);

    return (
        <Box>
            <Typography
                color="textSecondary"
                component="span"
            >
                {'Progress: '}
            </Typography>
            <Typography
                component="span"
                variant="body2"
            >
                {progressAsText}
            </Typography>
        </Box>
    );
};

const NotesTypography = ({notes}) => {
    return (
        <Grid
            alignItems="baseline"
            container
            spacing={1}
        >
            <Typography
                color="textSecondary"
                component={Grid}
                item
            >
                Notes:
            </Typography>
            <Typography
                component={Grid}
                item
                variant="body2"
            >
                {notes}
            </Typography>
        </Grid>
    );
};

const ProtocolDialog = ({protocol, onToggle, open}) => {
    const classes = useProtocolDialogStyles();
    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            onBackdropClick={onToggle}
            open={open}
        >
            <DialogTitle>
                Protocol
            </DialogTitle>
            <DialogContent>
                <Box
                    className={classes.content}
                    p={1}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {protocol}
                    </ReactMarkdown>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onToggle}
                    size="small"
                >
                    Close Protocol
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Result = ({result}) => {
    const fileName = useMemo(() => {
        const filePathParts = result?.split('/');
        return filePathParts[filePathParts.length - 1];
    }, [result]);

    const fileExt = useMemo(() => {
        const fileParts = result?.split('.');
        return fileParts[fileParts.length - 1]?.toLowerCase();
    }, [result]);

    const fileURL = useMemo(() => {
        return getFileUrl(result);
    }, [result]);

    const classes = useResultStyles();

    const renderedContent = useMemo(() => {
        switch (fileExt) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'svg':
            return <img
                alt="Result"
                src={fileURL}
            />;
        case 'pdf':
            return (
                <object
                    className={classes.content}
                    data={`${fileURL}#view=Fit&zoom=page-fit`}
                >
                    <a
                        href={fileURL}
                        title={fileName}
                    >
                        {result}
                    </a>
                </object>
            );
        case 'tsv':
        case 'csv':
            return <TabularResult fileURL={fileURL} />;
        default:
            return (
                <a
                    href={fileURL}
                    title={fileName}
                >
                    {result}
                </a>
            );
        }
    }, [classes.content, fileExt, fileName, fileURL, result]);

    return (
        <Accordion
            TransitionProps={{
                mountOnEnter: true,
                unmountOnExit: false
            }}
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>
                    {fileName}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.content}>
                {renderedContent}
            </AccordionDetails>
        </Accordion>
    );
};

const ResultsArea = ({applicationId, toolId, results}) => {
    const classes = useResultsAreaStyles();

    const renderedResult = useMemo(() => {
        return results?.map((result) => {
            return <Result
                applicationId={applicationId}
                key={result}
                result={result}
                toolId={toolId}
            />;
        });
    }, [applicationId, toolId, results]);

    return (
        <Card
            className={classes.root}
            variant="outlined"
        >
            <CardContent>
                <Typography
                    component="h2"
                    gutterBottom
                    variant="h6"
                >
                    Results
                </Typography>
                <Box width="100%">
                    {renderedResult}
                </Box>
            </CardContent>
        </Card>
    );
};

const GeneralInformation = ({createdAt, name, notes, progress, protocol, state}) => {
    const [openProtocol, setOpenProtocol] = useState(false);
    const classes = useGeneralInformationStyles();

    const handleToggleProtocol = useCallback(() => {
        setOpenProtocol(!openProtocol);
    }, [openProtocol]);

    const renderedName = useMemo(() => {
        return name && <NameTypography name={name} />;
    }, [name]);

    const renderedCreatedAt = useMemo(() => {
        return createdAt && <CreatedAtTypography createdAt={createdAt} />;
    }, [createdAt]);

    const renderedState = useMemo(() => {
        return state && <StateTypography state={state} />;
    }, [state]);

    const renderedProgress = useMemo(() => {
        return progress && <ProgressTypography progress={progress} />;
    }, [progress]);

    const renderedNotes = useMemo(() => {
        return notes && <NotesTypography notes={notes} />;
    }, [notes]);

    const renderedShowProtocol = useMemo(() => {
        return (
            protocol &&
                <Button
                    onClick={handleToggleProtocol}
                    size="small"
                >
                    Show Protocol
                </Button>

        );
    }, [handleToggleProtocol, protocol]);

    const renderedProtocol = useMemo(() => {
        return protocol && <ProtocolDialog
            onToggle={handleToggleProtocol}
            open={openProtocol}
            protocol={protocol}
        />;
    }, [handleToggleProtocol, openProtocol, protocol]);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    component="h2"
                    gutterBottom
                    variant="h6"
                >
                    General information
                </Typography>
                {renderedName}
                {renderedCreatedAt}
                {renderedState}
                {renderedProgress}
                {renderedNotes}
            </CardContent>
            <CardActions>
                {renderedShowProtocol}
                {renderedProtocol}
            </CardActions>
        </Card>
    );
};

const TitleBar = ({applicationId, toolId}) => {
    const classes = useTitleBarStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    component={NavLink}
                    to={`/tools/${toolId}/available-executions`}
                >
                    <ArrowBack />
                </IconButton>
                <Typography
                    className={classes.title}
                    variant="h6"
                >
                    Execution Overview
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

const Transition = React.forwardRef((props, ref) => {
    return <Slide
        direction="up"
        ref={ref}
        {...props}
    />;
});

export const ExecutionOverview = ({open, applicationId, toolId}) => {
    const toolExecution = useSelector(selectLoadedToolExecution);
    const classes = useExecutionOverviewStyles();

    const dispatch = useDispatch();
    const {hash} = useLocation();

    useEffect(() => {
        if (hash) {
            const toolExecutionId = hash.split('#')[1];
            dispatch(loadToolExecution({toolExecutionId}));
        }
    }, [dispatch, hash]);

    const renderedGeneralInformation = useMemo(() => {
        return toolExecution && <GeneralInformation {...toolExecution} />;
    }, [toolExecution]);

    const renderedResultsArea = useMemo(() => {
        return toolExecution && <ResultsArea
            applicationId={applicationId}
            toolId={toolId}
            {...toolExecution}
        />;
    }, [applicationId, toolId, toolExecution]);

    const renderedParameterViewer = useMemo(() => {
        return toolExecution?.parameterValues && <ParameterValueViewer parameterValues={toolExecution.parameterValues} />;
    }, [toolExecution]);

    return (
        <Dialog
            PaperProps={{className: classes.root}}
            TransitionComponent={Transition}
            fullScreen
            open={open}
        >
            <TitleBar
                applicationId={applicationId}
                toolId={toolId}
            />
            <Box
                overflow="auto"
                p={3}
                width="100%"
            >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={4}
                    >
                        {renderedGeneralInformation}
                    </Grid>
                    <Grid
                        item
                        xs={8}
                    >
                        {renderedParameterViewer}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        {renderedResultsArea}
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
};
