import {createSlice} from '@reduxjs/toolkit';

import {changeApplicationTheme} from './reducers';

export const themeSlice = createSlice({
    initialState: {paletteType: 'light'},
    name: 'theme',
    reducers: {changeApplicationTheme}
});

export const themeReducer = themeSlice.reducer;
