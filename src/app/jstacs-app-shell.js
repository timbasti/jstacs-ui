import {MuiThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {selectMuiTheme} from '../api/theme/selectors';
import {selectUserId} from '../api/users/selectors';
import {initializeApplication} from '../store/root-thunk';
import {JstacsApp} from './jstacs-app';

export const JstacsAppShell = () => {
    const muiTheme = useSelector(selectMuiTheme);
    const userId = useSelector(selectUserId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApplication({userId}));
    }, [dispatch, userId]);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <JstacsApp />
        </MuiThemeProvider>
    );
};
