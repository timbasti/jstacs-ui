import {createSelector} from '@reduxjs/toolkit';
import {createMuiTheme, useMediaQuery} from '@material-ui/core';

export const selectState = (state) => state.theme;

export const selectPaletteType = (state) => {
    const themeState = selectState(state);
    return themeState.paletteType;
};

export const selectMuiTheme = createSelector(
    [selectPaletteType],
    (paletteType) => {
        return createMuiTheme({
            palette: {
                type: paletteType
            }
        });
    }
)
