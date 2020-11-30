import React from 'react';
import {useSelector} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core';

import {selectMuiTheme} from '../api/theme/selectors';
import {JstacsApp} from './jstacs-app';

export function JstacsAppShell() {
    const muiTheme = useSelector(selectMuiTheme);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <JstacsApp />
        </ThemeProvider>
    );
}
