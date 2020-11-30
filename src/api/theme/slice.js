import {createSlice} from '@reduxjs/toolkit';
import {
    changeApplicationTheme
} from './reducers';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        paletteType: 'dark'
    },
    reducers: {
        changeApplicationTheme
    }
});

export const themeReducer = themeSlice.reducer;
