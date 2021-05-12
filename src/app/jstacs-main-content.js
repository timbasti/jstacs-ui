import loadable from '@loadable/component';
import {makeStyles, Toolbar} from '@material-ui/core';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

const AdminView = loadable(() => import('../views/admin/component'));
const HomeView = loadable(() => import('../views/home/component'));
const NoMatchView = loadable(() => import('../views/no-match/component'));
const TestEnvironmentView = loadable(() => import('../views/test-environment/component'));
const ToolView = loadable(() => import('../views/tool/component'));

const useStyles = makeStyles(() => {
    return {content: {flexGrow: 1}};
});

export const JstacsMainContent = () => {
    const classes = useStyles();

    return (
        <main
            className={classes.content}
            id="content"
        >
            <Toolbar />
            <Switch>
                <Route
                    component={HomeView}
                    exact
                    path="/"
                />
                <Route
                    component={AdminView}
                    path="/admin"
                />
                <Route
                    component={TestEnvironmentView}
                    path="/test-environment"
                />
                <Route
                    component={ToolView}
                    path="/applications/:applicationId/tools/:toolId"
                />
                <Route component={NoMatchView} />
            </Switch>
        </main>
    );
};