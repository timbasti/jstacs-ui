import {createAsyncThunk} from '@reduxjs/toolkit';
import delay from 'delay';

import {thunks as filesThunks} from '../files/thunks';
import {requests} from './requests';

const TIME_FOR_NEXT_POLL = 1000;
const STATUS_ACCEPTED = 202;

const fetchTools = createAsyncThunk('tools/fetch', async () => {
    const {data} = await requests.tools.fetch();
    return {data};
});

const fetchParameterSet = createAsyncThunk('tools/parameterSet/fetch', async (tool) => {
    const {data} = await requests.parameterSet.fetch(tool);
    return {data};
});

const postParameterValues = createAsyncThunk('tools/parameterSet/post', async ({tool, values, files}, {dispatch}) => {
    await dispatch(filesThunks.allFiles.post(files));
    const {data} = await requests.parameterSet.post(tool, values);
    return {data};
});

const fetchResults = createAsyncThunk('tools/results/fetch', async (tool) => {
    let {data, status} = await requests.results.fetch(tool);
    while (status === STATUS_ACCEPTED) {
        await delay(TIME_FOR_NEXT_POLL);
        const response = await requests.results.fetch(tool);
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
