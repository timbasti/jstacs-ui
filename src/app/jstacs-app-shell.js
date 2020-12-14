import React from 'react';
import {useSelector} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core';

import {selectMuiTheme} from '../api/theme/selectors';
import {JstacsApp} from './jstacs-app';

export function JstacsAppShell() {
    const muiTheme = useSelector(selectMuiTheme);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <JstacsApp />
        </MuiThemeProvider>
    );
}
