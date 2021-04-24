import {createAsyncThunk} from '@reduxjs/toolkit';

import * as requests from './requests';

export const listApplications = createAsyncThunk('applications/list', async () => {
    const {data} = await requests.listApplications();
    return data;
});

export const createApplication = createAsyncThunk('applications/create', async ({name, toolTypes = []}) => {
    const {data} = await requests.createApplication(name, toolTypes);
    return data;
});

export const updateApplication = createAsyncThunk('applications/update', async ({id, toolTypes = []}) => {
    const {data} = await requests.updateApplication(id, toolTypes);
    return data;
});

export const deleteApplication = createAsyncThunk('applications/delete', async ({id}) => {
    const {data} = await requests.deleteApplication(id);
    return data;
});

