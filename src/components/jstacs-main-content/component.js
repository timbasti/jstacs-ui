import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';

import {HomeView} from '../../views/home/component';
import {NoMatchView} from '../../views/no-match/component';
import {TestEnvironmentView} from '../../views/test-environment/component';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export function JstacsMainContent() {
    const classes = useStyles();

    return (
        <main id="content" className={classes.content}>
            <Toolbar />
            <Switch>
                <Route exact path="/">
                    <HomeView />
                </Route>
                <Route exact path="/test">
                    <TestEnvironmentView />
                </Route>
                <Route path="*">
                    <NoMatchView />
                </Route>
            </Switch>
        </main>
    );
}
