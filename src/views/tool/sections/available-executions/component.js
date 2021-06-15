import {Box, Card, CardContent, Grid, IconButton, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';

import {
    selectFulfilledToolExecutions,
    selectInitializedToolExecutions,
    selectPendingToolExecutions,
    selectRejectedToolExecutions,
    toolExecutionStates
} from '../../../../api/toolExecutions/selectors';
import {listToolExecutions} from '../../../../api/toolExecutions/thunks';
import {SimpleSearchField} from '../../../../components/simple-search-field/component';
import {useAppHeaderControlsContext} from '../../../../utils/contexts/app-header-controls-context';
import {ExecutionOverview} from './execution-overview/component';
import {useStatefulExecutionsStyles, useToolExecutionListStyles, useToolExecutionsOverviewStyles} from './styles';

const FallbackMessage = ({state}) => {
    const message = useMemo(() => {
        return `Currently there are no ${state.toLowerCase()} executions`;
    }, [state]);
    return (
        <Typography
            component="p"
            variant="body2"
        >
            {message}
        </Typography>
    );
};

const ToolExecutionItem = ({createdAt, id, name, progress, state, applicationId, toolId}) => {
    const progressHint = useMemo(() => {
        if (state === toolExecutionStates.INITIALIZED || state === toolExecutionStates.PENDING) {
            const cleanedProgress = progress < 0 ? 0 : progress;
            return `Progress: ${cleanedProgress * 100}%`;
        }
        const cleanedProgress = progress < 0 ? 1 : progress;
        return `Progress: ${cleanedProgress * 100}%`;
    }, [progress, state]);

    const itemText = useMemo(() => {
        const cleanedName = name || 'Empty name';
        return `${cleanedName} | ${createdAt}`;
    }, [name, createdAt]);

    return (
        <ListItem
            button
            component={NavLink}
            to={`/tools/${toolId}/available-executions#${id}`}
        >
            <ListItemText
                primary={itemText}
                secondary={progressHint}
            />
        </ListItem>
    );
};

const ToolExecutionList = ({filter, state, toolExecutions, applicationId, toolId}) => {
    const items = useMemo(() => {
        if (!toolExecutions || toolExecutions.length === 0) {
            return [<FallbackMessage
                key="noFilteredExecutions"
                state={state}
            />];
        }
        const filteredExecutions = toolExecutions
            .filter(({createdAt, name}) => !filter || name.includes(filter) || createdAt.includes(filter))
            .map((toolExecution) => {
                return (
                    <ToolExecutionItem
                        applicationId={applicationId}
                        key={toolExecution.id}
                        toolId={toolId}
                        {...toolExecution}
                    />
                );
            });
        if (filteredExecutions.length === 0) {
            return [<FallbackMessage
                key="noFilteredExecutions"
                state={state}
            />];
        }
        return filteredExecutions;
    }, [applicationId, toolId, filter, state, toolExecutions]);

    const classes = useToolExecutionListStyles();

    return (
        <List
            className={classes.root}
            dense
        >
            {items}
        </List>
    );
};

const ToolExecutionsOverview = ({filter, state, description, toolExecutions, applicationId, toolId}) => {
    const overview = useMemo(() => {
        return (
            <ToolExecutionList
                applicationId={applicationId}
                filter={filter}
                state={state}
                toolExecutions={toolExecutions}
                toolId={toolId}
            />
        );
    }, [applicationId, toolId, filter, state, toolExecutions]);

    const classes = useToolExecutionsOverviewStyles();

    return (
        <Card className={classes.root}>
            <CardContent
                className={classes.content}
                component={Grid}
                container
                direction="column"
                wrap="nowrap"
            >
                <Typography
                    component="h2"
                    variant="h6"
                >
                    {state}
                </Typography>
                <Typography color="textSecondary">
                    {description}
                </Typography>
                {overview}
            </CardContent>
        </Card>
    );
};

const InitializedToolExecutionsOverview = (props) => {
    const toolExecutions = useSelector(selectInitializedToolExecutions);

    return (
        <ToolExecutionsOverview
            description="Tool executions that have been created but not started"
            state={toolExecutionStates.INITIALIZED}
            toolExecutions={toolExecutions}
            {...props}
        />
    );
};

const PendingToolExecutionsOverview = (props) => {
    const toolExecutions = useSelector(selectPendingToolExecutions);

    return (
        <ToolExecutionsOverview
            description="Already running tool executions"
            state={toolExecutionStates.PENDING}
            toolExecutions={toolExecutions}
            {...props}
        />
    );
};

const FulfilledToolExecutionsOverview = (props) => {
    const toolExecutions = useSelector(selectFulfilledToolExecutions);

    return (
        <ToolExecutionsOverview
            description="Successfully finished tool executions"
            state={toolExecutionStates.FULFILLED}
            toolExecutions={toolExecutions}
            {...props}
        />
    );
};

const RejectedToolExecutionsOverview = (props) => {
    const toolExecutions = useSelector(selectRejectedToolExecutions);

    return (
        <ToolExecutionsOverview
            description="Failed tool executions"
            state={toolExecutionStates.REJECTED}
            toolExecutions={toolExecutions}
            {...props}
        />
    );
};

const StatefulExecutions = ({filter, applicationId, toolId}) => {
    const classes = useStatefulExecutionsStyles();

    return (
        <Grid
            className={classes.container}
            container
            spacing={3}
        >
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <InitializedToolExecutionsOverview
                    applicationId={applicationId}
                    filter={filter}
                    toolId={toolId}
                />
            </Grid>
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <PendingToolExecutionsOverview
                    applicationId={applicationId}
                    filter={filter}
                    toolId={toolId}
                />
            </Grid>
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <FulfilledToolExecutionsOverview
                    applicationId={applicationId}
                    filter={filter}
                    toolId={toolId}
                />
            </Grid>
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <RejectedToolExecutionsOverview
                    applicationId={applicationId}
                    filter={filter}
                    toolId={toolId}
                />
            </Grid>
        </Grid>
    );
};

const AvailableExecutions = ({applicationId, toolId}) => {
    const [filter, setFilter] = useState('');
    const [executionOpen, setExecutionOpen] = useState(false);
    const dispatch = useDispatch();
    const {setControls} = useAppHeaderControlsContext();
    const {hash} = useLocation();

    const handleFilterChange = useCallback((changeEvent) => setFilter(changeEvent.target.value), []);

    const handleRefreshClick = useCallback(() => dispatch(listToolExecutions({toolId})), [dispatch, toolId]);

    useEffect(() => {
        setExecutionOpen(Boolean(hash));
    }, [hash]);

    useEffect(() => {
        dispatch(listToolExecutions({toolId}));
    }, [dispatch, toolId]);

    useEffect(() => {
        setControls([
            <SimpleSearchField
                key="inlineSearch"
                onChange={handleFilterChange}
                placeholder="Search..."
            />,
            <IconButton
                color="inherit"
                key="refreshTrigger"
                onClick={handleRefreshClick}
            >
                <RefreshIcon />
            </IconButton>
        ]);
    }, [handleFilterChange, handleRefreshClick, setControls]);

    return (
        <Box
            height="100%"
            paddingLeft={3}
            paddingRight={3}
            paddingTop={3}
            width="100%"
        >
            <StatefulExecutions
                applicationId={applicationId}
                filter={filter}
                toolId={toolId}
            />
            <ExecutionOverview
                applicationId={applicationId}
                open={executionOpen}
                toolId={toolId}
            />
        </Box>
    );
};

export {AvailableExecutions};
