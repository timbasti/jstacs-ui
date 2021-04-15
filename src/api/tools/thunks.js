import {createAsyncThunk} from '@reduxjs/toolkit';
import delay from 'delay';

import {thunks as filesThunks} from '../files/thunks';
import {selectUserId} from '../users/selectors';
import {loadToolValues as doLoadToolValues, requests} from './requests';

const TIME_FOR_NEXT_POLL = 1000;
const STATUS_ACCEPTED = 202;

const fetchTools = createAsyncThunk('tools/fetch', async () => {
    const {data} = await requests.tools.fetch();
    return {data};
});

const fetchParameterSet = createAsyncThunk('tools/parameterSet/fetch', async (tool, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.parameterSet.fetch(tool, userId);
    return {data};
});

const postParameterValues = createAsyncThunk('tools/parameterSet/post', async ({tool, values, files}, {dispatch, getState}) => {
    await dispatch(filesThunks.allFiles.post(files));
    const state = getState();
    const userId = selectUserId(state);
    const {data} = await requests.parameterSet.post(tool, values, userId);
    return {data};
});

const fetchResults = createAsyncThunk('tools/results/fetch', async (tool, {getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    let {data, status} = await requests.results.fetch(tool, userId);
    while (status === STATUS_ACCEPTED) {
        await delay(TIME_FOR_NEXT_POLL);
        const response = await requests.results.fetch(tool, userId);
        data = response.data;
        status = response.status;
    }
    return {data};
});

const executeTool = createAsyncThunk('tools/execute', async ({tool, values, files}, {dispatch}) => {
    await dispatch(postParameterValues({
        files,
        tool,
        values
    }));
    await dispatch(fetchResults(tool));
});

export const loadToolValues = createAsyncThunk('tools/values/load', async (toolId) => {
    const {data} = await doLoadToolValues(toolId);
    return {data};
});

export const thunks = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterValues
    },
    results: {fetch: fetchResults},
    tools: {
        execute: executeTool,
        fetch: fetchTools
    }
};
