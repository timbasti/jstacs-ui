import {createAsyncThunk} from '@reduxjs/toolkit';

import {actions} from './actions';
import {requests} from './requests';

const postFile = createAsyncThunk('files/single-file/post', async ({file, uploadIndex}, {dispatch}) => {
    const onUploadProgress = (progress) => dispatch(actions.singleFile.post.inform({
        progress,
        uploadIndex
    }));
    const {data} = await requests.file.post(file, onUploadProgress);
    return {
        data,
        uploadIndex
    };
});

const postFiles = createAsyncThunk('files/all-files/post', async (files, {dispatch}) => {
    await Promise.all(files.map((file, uploadIndex) => dispatch(postFile({
        file,
        uploadIndex
    }))));
});

export const thunks = {
    allFiles: {post: postFiles},
    singleFile: {post: postFile}
};
