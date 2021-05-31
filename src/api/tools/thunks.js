import {createAsyncThunk} from '@reduxjs/toolkit';

import * as requests from './requests';

export const listTools = createAsyncThunk('tools/list', async () => {
    const {data} = await requests.listTools();
    return data;
});

export const loadTool = createAsyncThunk('tools/load', async ({applicationId, toolId}) => {
    const {data} = await requests.loadTool(applicationId, toolId);
    return data;
});
