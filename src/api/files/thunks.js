import {createAsyncThunk} from '@reduxjs/toolkit';

import {selectUserId} from '../users/selectors';
import {setFileSavingProgress} from './actions';
import * as requests from './requests';

export const saveFile = createAsyncThunk(
    'files/single-file/save',
    async ({file, toolExecutionId, uploadIndex}, {dispatch, getState}) => {
        const state = getState();
        const userId = selectUserId(state);
        const onUploadProgress = (progress) => dispatch(setFileSavingProgress({
            progress,
            uploadIndex
        }));
        const {data} = await requests.saveFile(file, userId, toolExecutionId, onUploadProgress);
        return {
            ...data,
            uploadIndex
        };
    }
);

export const saveAllFiles = createAsyncThunk('files/all-files/save', async ({files, toolExecutionId}, {dispatch}) => {
    const actions = await Promise.all(files.map(({file, fileKey}, uploadIndex) => dispatch(saveFile({
        file,
        fileKey,
        toolExecutionId,
        uploadIndex
    }))));
    const savedFiles = actions.map(({meta: {arg}, payload}) => ({
        fileKey: arg.fileKey,
        fileName: payload.fileName
    }));
    return savedFiles;
});
