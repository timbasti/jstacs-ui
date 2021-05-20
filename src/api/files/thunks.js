import {createAsyncThunk} from '@reduxjs/toolkit';

import {selectUserId} from '../users/selectors';
import {initFileSaving, setFileSavingProgress} from './actions';
import * as requests from './requests';

export const saveFile = createAsyncThunk(
    'files/single-file/save',
    async ({file, toolExecutionId, uploadIndex}, {dispatch, getState}) => {
        console.log('saveFile file, uploadIndex', file, uploadIndex);
        const state = getState();
        const userId = selectUserId(state);
        const onUploadProgress = (progress) => dispatch(setFileSavingProgress({
            progress,
            uploadIndex
        }));
        const {data} = await requests.saveFile(file, userId, toolExecutionId, onUploadProgress);
        return {
            data,
            uploadIndex
        };
    }
);

export const saveAllFiles = createAsyncThunk('files/all-files/save', async ({files, toolExecutionId}, {dispatch}) => {
    console.log('saveAllFiles files, toolExecutionId', files, toolExecutionId);
    const actions = await Promise.all(files.map(({file, fileName}, uploadIndex) => dispatch(saveFile({
        file,
        fileName,
        toolExecutionId,
        uploadIndex
    }))));
    // const fileNames = actions.map({meta, payload} => {});
    // console.log('saveAllFiles data', data);
    // return data;
});
