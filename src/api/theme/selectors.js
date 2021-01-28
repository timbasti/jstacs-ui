import {createSelector} from '@reduxjs/toolkit';
import {createMuiTheme} from '@material-ui/core';

export const selectState = (state) => state.theme;

export const selectPaletteType = (state) => {
    const themeState = selectState(state);
    return themeState.paletteType;
};

function createLightTheme() {
    return createMuiTheme({
        palette: {
            type: 'light'
        }
    });
}

function createDarkTheme() {
    return createMuiTheme({
        palette: {
            type: 'dark'
        }
    });
}

function createArcTheme() {
    return createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#5294e2'
            },
            secondary: {
                main: '#CC575D'
            },
            background: {
                default: '#383c4a',
                paper: '#4b5162'
            }
        }
    });
}

export const selectMuiTheme = createSelector([selectPaletteType], (paletteType) => {
    if (paletteType === 'light') {
        return createLightTheme();
    }
    return createDarkTheme();
});
