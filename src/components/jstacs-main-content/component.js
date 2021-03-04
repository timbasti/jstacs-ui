import {makeStyles, Toolbar} from '@material-ui/core';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {HomeView} from '../../views/home/component';
import {NoMatchView} from '../../views/no-match/component';
import {TestEnvironmentView} from '../../views/test-environment/component';
import {ToolsView} from '../../views/tools/component';

const useStyles = makeStyles((theme) => {
    const contentSpacing = 3;
    return {
        content: {
            flexGrow: 1,
            padding: theme.spacing(contentSpacing)
        }
    };
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
                    path="/test"
                >
                    <TestEnvironmentView />
                </Route>

                <Route
                    exact
                    path="/tools"
                >
                    <ToolsView />
                </Route>

                <Route path="*">
                    <NoMatchView />
                </Route>
            </Switch>
        </main>
    );
};
