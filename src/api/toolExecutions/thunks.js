import {createAsyncThunk} from '@reduxjs/toolkit';
import setValue from 'set-value';

import {extractAllFiles} from '../../helpers/file-helpers';
import {saveAllFiles} from '../files/thunks';
import {selectUserId} from '../users/selectors';
import * as requests from './requests';

export const createToolExecution = createAsyncThunk(
    'toolExecutions/create',
    async ({toolId, executionInformation}, {getState}) => {
        const state = getState();
        const userId = selectUserId(state);
        const {data} = await requests.createToolExecution(toolId, userId, executionInformation);
        return data;
    }
);

export const loadToolExecution = createAsyncThunk('toolExecutions/load', async ({toolExecutionId}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.loadToolExecution(toolExecutionId, userId);
    return data;
});

export const listToolExecutions = createAsyncThunk('toolExecutions/list', async ({toolId}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.listToolExecutions(toolId, userId);
    return data;
});

export const updateToolExecution = createAsyncThunk(
    'toolExecutions/update',
    async ({toolExecutionId, executionParameters}, {getState}) => {
        const state = getState();
        const userId = selectUserId(state);
        const {data} = await requests.updateToolExecution(toolExecutionId, executionParameters, userId);
        return data;
    }
);

export const deleteToolExecution = createAsyncThunk('toolExecutions/delete', async ({toolExecutionId}, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.deleteToolExecution(toolExecutionId, userId);
    return data;
});

export const startToolExecution = createAsyncThunk('toolExecutions/start', async ({toolId, values}, {dispatch}) => {
    const {executionInformation, executionParameters} = values;
    const {payload: {toolExecutionId}} = await dispatch(createToolExecution({
        executionInformation,
        toolId
    }));
    const files = extractAllFiles(executionParameters);
    const {payload: savedFiles} = await dispatch(saveAllFiles({
        files,
        toolExecutionId
    }));
    savedFiles.forEach(({fileKey, fileName}) => {
        setValue(executionParameters, fileKey, {name: fileName});
    });
    const {payload: data} = await dispatch(updateToolExecution({
        executionParameters,
        toolExecutionId
    }));
    return data;
});
