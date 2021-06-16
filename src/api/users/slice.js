import {createSlice} from '@reduxjs/toolkit';

import * as thunks from './thunks';

export const slice = createSlice({
    extraReducers: {
        [thunks.checkUser.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.checkUser.fulfilled]: (state, action) => {
            const {id, toolExecutions} = action.payload;
            state.processing = false;
            state.toolExecutions = toolExecutions;
            state.id = id;
        },
        [thunks.checkUser.rejected]: (state, action) => {
            const {error} = action.payload;
            state.error = error;
            state.processing = false;
        }
    },
    initialState: {
        error: null,
        id: null,
        processing: false,
        toolExecutions: null
    },
    name: 'user',
    reducers: {}
});

export const reducer = slice.reducer;
