import {createSlice} from '@reduxjs/toolkit';

import {setFileSavingProgress} from './actions';
import {saveAllFiles, saveFile} from './thunks';

const createInitialUploadState = (name) => ({
    error: null,
    name,
    processing: false,
    progress: 0
});

export const slice = createSlice({
    extraReducers: {
        [saveAllFiles.pending]: (state, {meta}) => {
            console.log('saveAllFiles.pending meta', meta);
            const {arg: {files}} = meta;
            const uploads = files.map((file) => createInitialUploadState(file.name));
            state.uploads = uploads;
            state.processing = true;
        },
        [saveAllFiles.fulfilled]: (state) => {
            state.processing = false;
        },
        [saveAllFiles.rejected]: (state) => {
            state.processing = false;
        },
        [saveFile.pending]: (state, {meta}) => {
            const {uploadIndex} = meta.arg;
            state.uploads[uploadIndex].processing = true;
        },
        [setFileSavingProgress]: (state, action) => {
            const {progress, uploadIndex} = action.payload;
            state.uploads[uploadIndex].progress = progress;
        },
        [saveFile.fulfilled]: (state, action) => {
            const {uploadIndex} = action.payload;
            state.uploads[uploadIndex].processing = false;
        },
        [saveFile.rejected]: (state, action) => {
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

export const reducer = slice.reducer;
