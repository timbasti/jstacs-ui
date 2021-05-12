import {createMuiTheme} from '@material-ui/core';
import {blue, indigo, orange} from '@material-ui/core/colors';
import {createSelector} from '@reduxjs/toolkit';

export const selectState = (state) => state.theme;

export const selectPaletteType = (state) => {
    const themeState = selectState(state);
    return themeState.paletteType;
};

const createLightTheme = () => createMuiTheme({
    palette: {
        primary: indigo,
        secondary: orange,
        type: 'light'
    }
});

const createDarkTheme = () => createMuiTheme({
    palette: {
        primary: blue,
        secondary: orange,
        type: 'dark'
    }
});

export const selectMuiTheme = createSelector(selectPaletteType, (paletteType) => {
    const muiTheme = paletteType === 'light' ? createLightTheme() : createDarkTheme();
    return muiTheme;
});
