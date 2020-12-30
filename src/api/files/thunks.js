import {createAsyncThunk} from '@reduxjs/toolkit';
import {actions} from './actions';
import {requests} from './requests';

const postFile = createAsyncThunk(
    'files/single-file/post',
    async ({file, uploadIndex}, {dispatch}) => {
        dispatch(actions.singleFile.post.init({uploadIndex}));
        const onUploadProgress = (progress) =>
            dispatch(actions.singleFile.post.inform({progress, uploadIndex}));
        const {data} = await requests.file.post(file, onUploadProgress);
        return {data, uploadIndex};
    }
);

const postFiles = createAsyncThunk(
    'files/all-files/post',
    async (files, {dispatch}) => {
        const uploads = files.map((file) => {
            return {
                fileName: file.name,
                progress: 0,
                processing: false,
                error: null
            };
        });
        dispatch(actions.allFiles.post.init({uploads}));
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await dispatch(postFile({file, uploadIndex: index}));
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
