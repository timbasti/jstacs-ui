import {createSlice} from '@reduxjs/toolkit';

import {thunks as toolsThunks} from './thunks';

export const toolsSlice = createSlice({
    extraReducers: {
        [toolsThunks.tools.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [toolsThunks.tools.fetch.fulfilled]: (state, action) => {
            const {data: availableTools} = action.payload;
            state.processing = false;
            state.available = availableTools;
        },
        [toolsThunks.tools.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },
        [toolsThunks.parameterSet.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [toolsThunks.parameterSet.fetch.fulfilled]: (state, action) => {
            const {data: parameterSet} = action.payload;
            state.processing = false;
            state.parameterSet = parameterSet;
        },
        [toolsThunks.parameterSet.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },
        [toolsThunks.parameterSet.post.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [toolsThunks.parameterSet.post.fulfilled]: (state) => {
            state.processing = false;
        },
        [toolsThunks.parameterSet.post.rejected]: (state, action) => {
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
        processing: false
    },
    name: 'tools',
    reducers: {}
});

export const toolsReducer = toolsSlice.reducer;
