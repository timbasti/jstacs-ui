import {createAsyncThunk} from '@reduxjs/toolkit';

import * as requests from './requests';

export const checkUser = createAsyncThunk('user/check', async (userId = '') => {
    const {data} = await requests.checkUser(userId);
    return data;
});
