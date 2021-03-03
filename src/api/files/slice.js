import {createSlice} from '@reduxjs/toolkit';

import {actions as filesAction} from './actions';
import {thunks as filesThunks} from './thunks';

const createInitialUploadState = (name) => ({
    error: null,
    name,
    processing: false,
    progress: 0
});

export const filesSlice = createSlice({
    extraReducers: {
        [filesThunks.allFiles.post.pending]: (state, {meta}) => {
            const uploads = meta.arg.map((file) => createInitialUploadState(file.name));
            state.uploads = uploads;
            state.processing = true;
        },
        [filesThunks.allFiles.post.fulfilled]: (state) => {
            state.processing = false;
        },
        [filesThunks.allFiles.post.rejected]: (state) => {
            state.processing = false;
        },
        [filesThunks.singleFile.post.pending]: (state, {meta}) => {
            const {uploadIndex} = meta.arg;
            state.uploads[uploadIndex].processing = true;
        },
        [filesAction.singleFile.post.inform]: (state, action) => {
            const {progress, uploadIndex} = action.payload;
            state.uploads[uploadIndex].progress = progress;
        },
        [filesThunks.singleFile.post.fulfilled]: (state, action) => {
            const {uploadIndex} = action.payload;
            state.uploads[uploadIndex].processing = false;
        },
        [filesThunks.singleFile.post.rejected]: (state, action) => {
            const {data, uploadIndex} = action.payload;
            state.uploads[uploadIndex].processing = false;
            state.uploads[uploadIndex].error = data;
        }
    },
    initialState: {
        processing: false,
        uploads: []
    },
    name: 'files',
    reducers: {}
});

export const filesReducer = filesSlice.reducer;
