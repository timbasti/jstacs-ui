import {createAsyncThunk} from '@reduxjs/toolkit';

import {selectUserId} from '../users/selectors';
import {actions} from './actions';
import {requests} from './requests';

const postFile = createAsyncThunk('files/single-file/post', async ({file, uploadIndex}, {dispatch, getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const onUploadProgress = (progress) => dispatch(actions.singleFile.post.inform({
        progress,
        uploadIndex
    }));
    const {data} = await requests.file.post(file, userId, onUploadProgress);
    return {
        data,
        uploadIndex
    };
});

const postFiles = createAsyncThunk('files/all-files/post', async (files, {dispatch, getState}) => {
    await Promise.all(files.map((file, uploadIndex) => dispatch(postFile({
        file,
        uploadIndex
    }))));
});

export const thunks = {
    allFiles: {post: postFiles},
    singleFile: {post: postFile}
};
