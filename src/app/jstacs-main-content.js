// import loadable from '@loadable/component';
import {makeStyles, Toolbar} from '@material-ui/core';
import React, {useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminView from '../views/admin/component';
import DashboardView from '../views/dashboard/component';
import NoMatchView from '../views/no-match/component';
import TestEnvironmentView from '../views/test-environment/component';
import ToolView from '../views/tool/component';

/*
const AdminView = loadable(() => import('../views/admin/component'));
const DashboardView = loadable(() => import('../views/dashboard/component'));
const NoMatchView = loadable(() => import('../views/no-match/component'));
const TestEnvironmentView = loadable(() => import('../views/test-environment/component'));
const ToolView = loadable(() => import('../views/tool/component'));
*/

const useStyles = makeStyles(() => {
    return {
        contentFrame: {
            '@media (min-width:0px) and (orientation: landscape)': {height: 'calc(100vh - 48px)'},
            '@media (min-width:600px)': {height: 'calc(100vh - 64px)'},
            height: 'calc(100vh - 56px)'
        },
        mainFrame: {
            flexGrow: 1,
            height: '100vh'
        }
    };
});

// TODO: Use ref to get the height of toolbar and to compute the height of main
export const JstacsMainContent = () => {
    const classes = useStyles();

    const handleDashboardRender = useCallback(() => {
        return <DashboardView className={classes.contentFrame} />;
    }, [classes.contentFrame]);

    const handleAdminRender = useCallback(() => {
        return <AdminView className={classes.contentFrame} />;
    }, [classes.contentFrame]);

    const handleTestEnvRender = useCallback(() => {
        return <TestEnvironmentView className={classes.contentFrame} />;
    }, [classes.contentFrame]);

    const handleToolRender = useCallback(() => {
        return <ToolView className={classes.contentFrame} />;
    }, [classes.contentFrame]);

    const handleNoMatchRender = useCallback(() => {
        return <NoMatchView className={classes.contentFrame} />;
    }, [classes.contentFrame]);

    return (
        <main
            className={classes.mainFrame}
            id="content"
        >
            <Toolbar />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={handleDashboardRender}
                />
                <Route
                    className={classes.contentFrame}
                    path="/admin"
                    render={handleAdminRender}
                />
                <Route
                    className={classes.contentFrame}
                    path="/test-environment"
                    render={handleTestEnvRender}
                />
                <Route
                    className={classes.contentFrame}
                    path="/tools/:toolId"
                    render={handleToolRender}
                />
                <Route
                    className={classes.contentFrame}
                    render={handleNoMatchRender}
                />
            </Switch>
        </main>
    );
};
