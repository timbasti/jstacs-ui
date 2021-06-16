import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import {Box, Card, CardContent, Grid, IconButton, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';

import {setRouteData} from '../../api/route/slice';
import {selectPaletteType} from '../../api/theme/selectors';
import {toolExecutionStates} from '../../api/toolExecutions/selectors';
import {
    selectUserFulfilledToolExecutions,
    selectUserId,
    selectUserInitializedToolExecutions,
    selectUserPendingToolExecutions,
    selectUserRejectedToolExecutions,
    selectUserUsedTools
} from '../../api/users/selectors';
import {checkUser} from '../../api/users/thunks';
import {SimpleSearchField} from '../../components/simple-search-field/component';
import {useAppHeaderControlsContext} from '../../utils/contexts/app-header-controls-context';
import {
    useDashboardViewStyles,
    useStatefulExecutionsStyles,
    useToolExecutionListStyles,
    useToolExecutionsOverviewStyles
} from './styles';

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
    const toolExecutions = useSelector(selectUserInitializedToolExecutions);

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
    const toolExecutions = useSelector(selectUserPendingToolExecutions);

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
    const toolExecutions = useSelector(selectUserFulfilledToolExecutions);

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
    const toolExecutions = useSelector(selectUserRejectedToolExecutions);

    return (
        <ToolExecutionsOverview
            description="Failed tool executions"
            state={toolExecutionStates.REJECTED}
            toolExecutions={toolExecutions}
            {...props}
        />
    );
};

const StatefulExecutions = ({filter}) => {
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
                <InitializedToolExecutionsOverview filter={filter} />
            </Grid>
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <PendingToolExecutionsOverview filter={filter} />
            </Grid>
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <FulfilledToolExecutionsOverview filter={filter} />
            </Grid>
            <Grid
                className={classes.item}
                item
                sm={6}
                xs={12}
            >
                <RejectedToolExecutionsOverview filter={filter} />
            </Grid>
        </Grid>
    );
};

const usedToolsGridColumns = [
    {
        defaultFlex: 1,
        header: 'Name',
        minWidth: 150,
        name: 'name',
        type: 'string'
    },
    {
        defaultFlex: 1,
        header: 'Last used at',
        minWidth: 150,
        name: 'lastUsedAt',
        type: 'string'
    },
    {
        defaultFlex: 1,
        header: '# Initialized',
        minWidth: 150,
        name: 'INITIALIZED',
        type: 'string'
    },
    {
        defaultFlex: 1,
        header: '# Pending',
        minWidth: 150,
        name: 'PENDING',
        type: 'string'
    },
    {
        defaultFlex: 1,
        header: '# Fulfilled',
        minWidth: 150,
        name: 'FULFILLED',
        type: 'string'
    },
    {
        defaultFlex: 1,
        header: '# Rejected',
        minWidth: 150,
        name: 'REJECTED',
        type: 'string'
    }
];

const usedToolsGridFilters = [
    {
        name: 'name',
        operator: 'contains',
        type: 'string'
    },
    {
        name: 'lastUsedAt',
        operator: 'contains',
        type: 'string'
    },
    {
        name: 'INITIALIZED',
        operator: 'contains',
        type: 'string'
    },
    {
        name: 'PENDING',
        operator: 'contains',
        type: 'string'
    },
    {
        name: 'FULFILLED',
        operator: 'contains',
        type: 'string'
    },
    {
        name: 'REJECTED',
        operator: 'contains',
        type: 'string'
    }
];

const DashboardView = ({className}) => {
    const dispatch = useDispatch();
    const paletteType = useSelector(selectPaletteType);
    const recentlyUsedTools = useSelector(selectUserUsedTools);
    const classes = useDashboardViewStyles();
    const history = useHistory();

    const theme = useMemo(() => {
        return `default-${paletteType}`;
    }, [paletteType]);

    const handleSelectionChange = useCallback(
        ({selected}) => {
            const toolRoute = `/tools/${selected}/available-executions`;
            history.push(toolRoute);
        },
        [history]
    );

    useEffect(() => {
        dispatch(setRouteData({view: 'Dashboard'}));
    }, [dispatch]);

    return (
        <Box
            className={className}
            p={3}
        >
            <Card className={classes.root}>
                <CardContent
                    className={classes.content}
                    component={Grid}
                    container
                    direction="column"
                >
                    <Grid item>
                        <Typography
                            component="h2"
                            gutterBottom
                            variant="h6"
                        >
                            Recently Used Tools
                        </Typography>
                    </Grid>
                    <Grid
                        className={classes.gridContent}
                        item
                    >
                        <ReactDataGrid
                            className={classes.grid}
                            columns={usedToolsGridColumns}
                            dataSource={recentlyUsedTools}
                            defaultFilterValue={usedToolsGridFilters}
                            defaultLimit={15}
                            enableSelection
                            onSelectionChange={handleSelectionChange}
                            pagination="local"
                            theme={theme}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DashboardView;
