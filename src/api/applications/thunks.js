import {createAsyncThunk} from '@reduxjs/toolkit';

import * as requests from './requests';

export const listApplications = createAsyncThunk('applications/list', async () => {
    const {data} = await requests.listApplications();
    return data;
});

export const createApplication = createAsyncThunk('applications/create', async ({name, toolIds = []}) => {
    const {data} = await requests.createApplication(name, toolIds);
    return data;
});

export const updateApplication = createAsyncThunk('applications/update', async ({id, name, toolIds = []}) => {
    const {data} = await requests.updateApplication(id, name, toolIds);
    return data;
});

export const deleteApplication = createAsyncThunk('applications/delete', async ({id}) => {
    const {data} = await requests.deleteApplication(id);
    return data;
});

