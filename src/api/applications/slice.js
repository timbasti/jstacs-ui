import {createSlice} from '@reduxjs/toolkit';

import * as thunks from './thunks';

export const slice = createSlice({
    extraReducers: {
        [thunks.listApplications.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.listApplications.fulfilled]: (state, action) => {
            state.available = action.payload;
            state.processing = false;
        },
        [thunks.listApplications.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        },
        [thunks.createApplication.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.createApplication.fulfilled]: (state, action) => {
            state.available = action.payload;
            state.processing = false;
        },
        [thunks.createApplication.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        },
        [thunks.updateApplication.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.updateApplication.fulfilled]: (state, action) => {
            state.available = action.payload;
            state.processing = false;
        },
        [thunks.updateApplication.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        },
        [thunks.deleteApplication.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [thunks.deleteApplication.fulfilled]: (state, action) => {
            state.available = action.payload;
            state.processing = false;
        },
        [thunks.deleteApplication.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        }
    },
    initialState: {
        available: null,
        error: null,
        processing: false
    },
    name: 'applications',
    reducers: {}
});

export const reducer = slice.reducer;
