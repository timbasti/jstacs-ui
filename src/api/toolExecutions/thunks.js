import {createAsyncThunk} from '@reduxjs/toolkit';

import {extractAllFiles} from '../../helpers/file-helpers';
import {saveAllFiles} from '../files/thunks';
import {selectUserId} from '../users/selectors';
import * as requests from './requests';

export const createToolExecution = createAsyncThunk('toolExecutions/create', async ({toolId}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.createToolExecution(toolId, userId);
    return data;
});

export const loadToolExecution = createAsyncThunk('toolExecutions/load', async ({toolExecutionId}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.loadToolExecution(toolExecutionId, userId);
    return data;
});

export const updateToolExecution = createAsyncThunk('toolExecutions/update', async ({toolExecutionId, values}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.updateToolExecution(toolExecutionId, values, userId);
    return data;
});

export const deleteToolExecution = createAsyncThunk('toolExecutions/delete', async ({toolExecutionId}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.deleteToolExecution(toolExecutionId, userId);
    return data;
});

export const startToolExecution = createAsyncThunk('toolExecutions/start', async ({toolId, values}, {dispatch}) => {
    console.log('startToolExecution toolId, values', toolId, values);
    const {payload: {toolExecutionId}} = await dispatch(createToolExecution({toolId}));
    const {files, values: updatedValues} = extractAllFiles(values);
    const fileNames = files.map((file) => file.name);
    console.log('startToolExecution files', files);
    const {payload} = await dispatch(saveAllFiles({
        fileNames,
        files,
        toolExecutionId
    }));
    console.log('startToolExecution payload', payload);
    await dispatch(updateToolExecution({
        toolExecutionId,
        values: updatedValues
    }));
});
