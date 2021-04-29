import {createSlice} from '@reduxjs/toolkit';

import * as thunks from './thunks';

const slice = createSlice({
    extraReducers: {
        [thunks.listTools.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.listTools.fulfilled]: (state, action) => {
            const {data: availableTools} = action.payload;
            state.processing = false;
            state.available = availableTools;
        },
        [thunks.listTools.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },

        [thunks.loadTool.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.loadTool.fulfilled]: (state, action) => {
            const {data: loadedTool} = action.payload;
            state.processing = false;
            state.selected = loadedTool;
        },
        [thunks.loadTool.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        }
    },
    initialState: {
        available: [],
        error: null,
        processing: false,
        selected: null
    },
    name: 'tools',
    reducers: {}
});

export const toolsReducer = slice.reducer;
