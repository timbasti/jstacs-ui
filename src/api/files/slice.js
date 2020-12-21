import {createSlice} from '@reduxjs/toolkit';
import {actions as filesAction} from './actions';
import {thunks as filesThunks} from './thunks';

const currentUploadInitialState = {
    error: null,
    processing: false,
    fileName: null
};

export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        error: null,
        processing: false,
        currentUpload: currentUploadInitialState,
        uploadQueue: [],
        uploads: []
    },
    reducers: {},
    extraReducers: {
        [filesAction.allFiles.init]: (state, action) => {
            state.uploads = [];
            state.uploadQueue = [...action.payload];
        },
        [filesThunks.allFiles.post.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [filesThunks.allFiles.post.fulfilled]: (state) => {
            state.processing = false;
            state.currentUpload = currentUploadInitialState;
        },
        [filesThunks.allFiles.post.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
            state.currentUpload = currentUploadInitialState;
        },
        [filesAction.singleFile.init]: (state, action) => {
            state.currentUpload.fileName = action.payload;
        },
        [filesThunks.singleFile.post.pending]: (state) => {
            state.currentUpload.error = null;
            state.currentUpload.processing = true;
        },
        [filesThunks.singleFile.post.fulfilled]: (state, action) => {
            const {fileName} = action.payload;
            state.uploadQueue = state.uploadQueue.filter((entry) => entry !== fileName);
            state.uploads.push(fileName);
            state.currentUpload.processing = false;
        },
        [filesThunks.singleFile.post.rejected]: (state, action) => {
            state.currentUpload.error = action.payload;
            state.currentUpload.processing = false;
        }
    }
});

export const filesReducer = filesSlice.reducer;
