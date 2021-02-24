import {createMuiTheme} from '@material-ui/core';
import {createSelector} from '@reduxjs/toolkit';

export const selectState = (state) => state.theme;

export const selectPaletteType = (state) => {
    const themeState = selectState(state);
    return themeState.paletteType;
};

const createLightTheme = () => createMuiTheme({palette: {type: 'light'}});

const createDarkTheme = () => createMuiTheme({palette: {type: 'dark'}});

export const selectMuiTheme = createSelector([selectPaletteType], (paletteType) => {
    if (paletteType === 'light') {
        return createLightTheme();
    }
    return createDarkTheme();
});
