import {makeStyles, Toolbar} from '@material-ui/core';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {AdminView} from '../../views/admin/component';
import {HomeView} from '../../views/home/component';
import {NoMatchView} from '../../views/no-match/component';
import {TestEnvironmentView} from '../../views/test-environment/component';
import {ToolView} from '../../views/tool/component';
import {ToolsView} from '../../views/tools/component';

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
                    exact
                    path="/"
                >
                    <HomeView />
                </Route>
                <Route
                    exact
                    path="/admin"
                >
                    <AdminView />
                </Route>
                <Route
                    exact
                    path="/tool/:toolId"
                >
                    <ToolView />
                </Route>
                <Route path="*">
                    <NoMatchView />
                </Route>
            </Switch>
        </main>
    );
};
