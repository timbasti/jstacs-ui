import {createSlice} from '@reduxjs/toolkit';

import {thunks} from './thunks';

export const toolsSlice = createSlice({
    extraReducers: {
        [thunks.tools.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.tools.fetch.fulfilled]: (state, action) => {
            const {data: availableTools} = action.payload;
            state.processing = false;
            state.available = availableTools;
        },
        [thunks.tools.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },
        [thunks.parameterSet.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.parameterSet.fetch.fulfilled]: (state, action) => {
            const {data: parameterSet} = action.payload;
            state.processing = false;
            state.parameterSet = parameterSet;
        },
        [thunks.parameterSet.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },
        [thunks.parameterSet.post.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.parameterSet.post.fulfilled]: (state, action) => {
            const {data: parameterSet} = action.payload;
            state.processing = false;
            state.parameterSet = parameterSet;
        },
        [thunks.parameterSet.post.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },
        [thunks.results.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.results.fetch.fulfilled]: (state, action) => {
            const {data: {results, progress}} = action.payload;
            state.processing = false;
            state.results = results;
            state.progress = progress;
        },
        [thunks.results.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        }
    },
    initialState: {
        available: null,
        error: null,
        parameterSet: {
            parameters: null,
            toolName: null,
            type: null
        },
        processing: false,
        progress: null,
        results: null
    },
    name: 'tools',
    reducers: {}
});

export const toolsReducer = toolsSlice.reducer;
