import {createSlice} from '@reduxjs/toolkit';

import {thunks as testThunks} from './thunks';

export const testSlice = createSlice({
    extraReducers: {
        [testThunks.parameterSet.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [testThunks.parameterSet.fetch.fulfilled]: (state, action) => {
            const {data: parameterSet} = action.payload;
            state.processing = false;
            state.parameterSet = parameterSet;
        },
        [testThunks.parameterSet.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        },
        [testThunks.parameterSet.post.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [testThunks.parameterSet.post.fulfilled]: (state) => {
            state.processing = false;
        },
        [testThunks.parameterSet.post.rejected]: (state, action) => {
            const {data: error} = action.payload;
            state.error = error;
            state.processing = false;
        }
    },
    initialState: {
        error: null,
        parameterSet: {
            parameters: null,
            toolName: null,
            type: null
        },
        processing: false
    },
    name: 'test',
    reducers: {}
});

export const testReducer = testSlice.reducer;
