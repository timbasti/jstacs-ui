import {createAsyncThunk} from '@reduxjs/toolkit';

import * as requests from './requests';

export const listAvailableApplications = createAsyncThunk('applications/list', async () => {
    const {data} = await requests.listAvailableApplications();
    return data;
});

export const createNewApplication = createAsyncThunk('applications/create', async ({name, toolTypes = []}) => {
    const {data} = await requests.createNewApplication(name, toolTypes);
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

