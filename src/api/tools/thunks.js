import {createAsyncThunk} from '@reduxjs/toolkit';

import {requests} from './requests';

const fetchTools = createAsyncThunk('tools/fetch', async () => {
    const {data} = await requests.tools.fetch();
    return {data};
});

const fetchParameterSet = createAsyncThunk('tools/parameterSet/fetch', async (tool) => {
    const {data} = await requests.parameterSet.fetch(tool);
    return {data};
});

const postParameterSet = createAsyncThunk('tools/parameterSet/post', async (tool, parameterSet) => {
    const {data} = await requests.parameterSet.post(tool, parameterSet);
    return {data};
});

export const thunks = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet
    },
    tools: {fetch: fetchTools}
};
