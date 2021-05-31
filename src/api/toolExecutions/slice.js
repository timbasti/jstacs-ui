import {createSlice} from '@reduxjs/toolkit';

import {createToolExecution, deleteToolExecution, listToolExecutions, loadToolExecution, updateToolExecution} from './thunks';

export const slice = createSlice({
    extraReducers: {
        [createToolExecution.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [createToolExecution.fulfilled]: (state, {payload}) => {
            const {toolExecutionId} = payload;
            state.created = toolExecutionId;
            state.processing = false;
        },
        [createToolExecution.rejected]: (state, {payload}) => {
            state.error = payload;
            state.processing = false;
        },
        [loadToolExecution.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [loadToolExecution.fulfilled]: (state, {payload}) => {
            state.loaded = payload;
            state.processing = false;
        },
        [loadToolExecution.rejected]: (state, {payload}) => {
            state.error = payload;
            state.processing = false;
        },
        [listToolExecutions.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [listToolExecutions.fulfilled]: (state, {payload}) => {
            state.available = payload;
            state.processing = false;
        },
        [listToolExecutions.rejected]: (state, {payload}) => {
            state.error = payload;
            state.processing = false;
        },
        [updateToolExecution.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [updateToolExecution.fulfilled]: (state, {payload}) => {
            state.updatedParameterSet = payload;
            state.processing = false;
        },
        [updateToolExecution.rejected]: (state, {payload}) => {
            state.error = payload;
            state.processing = false;
        },
        [deleteToolExecution.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [deleteToolExecution.fulfilled]: (state) => {
            state.processing = false;
        },
        [deleteToolExecution.rejected]: (state, {payload}) => {
            state.error = payload;
            state.processing = false;
        }
    },
    initialState: {
        available: null,
        created: null,
        error: null,
        loaded: null,
        processing: false,
        updatedParameterSet: null
    },
    name: 'toolExecutions',
    reducers: {}
});

export const reducer = slice.reducer;
