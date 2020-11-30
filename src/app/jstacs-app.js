import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

import {JstacsHeader} from '../components/jstacs-header/component';
import {JstacsNavigation} from '../components/jstacs-navigation/component';
import {JstacsMainContent} from '../components/jstacs-main-content/component';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }
}));

export function JstacsApp() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <JstacsHeader />
            <Router>
                <JstacsNavigation />
                <JstacsMainContent />
            </Router>
        </div>
    );
}
