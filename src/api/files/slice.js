import {createSlice} from '@reduxjs/toolkit';
import {actions as filesAction} from './actions';
import {thunks as filesThunks} from './thunks';

export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        uploads: [],
        processing: false
    },
    reducers: {},
    extraReducers: {
        [filesThunks.allFiles.post.pending]: (state, action) => {
            console.log('filesThunks.allFiles.post.pending', action);
            state.processing = true;
        },
        [filesAction.allFiles.post.init]: (state, action) => {
            const {uploads} = action.payload;
            state.uploads = uploads;
        },
        [filesThunks.allFiles.post.fulfilled]: (state) => {
            state.processing = false;
        },
        [filesThunks.allFiles.post.rejected]: (state) => {
            state.processing = false;
        },
        [filesThunks.singleFile.post.pending]: (state, action) => {
            console.log('filesAction.singleFile.post.pending', action);
        },
        [filesAction.singleFile.post.init]: (state, action) => {
            const {uploadIndex} = action.payload;
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
    }
});

export const filesReducer = filesSlice.reducer;
