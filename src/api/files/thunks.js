import {createAsyncThunk} from '@reduxjs/toolkit';
import {actions} from './actions';
import {requests} from './requests';

const postFile = createAsyncThunk('files/single-file/post', async (file) => {
    const response = await requests.file.post(file);
    return response.data;
});

const postFiles = createAsyncThunk(
    'files/all-files/post',
    async (files, {dispatch}) => {
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            dispatch(actions.singleFile.init(file.name));
            await dispatch(postFile(file));
        }
    }
);

export const thunks = {
    singleFile: {
        post: postFile
    },
    allFiles: {
        post: postFiles
    }
};
