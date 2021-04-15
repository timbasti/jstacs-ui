import {createAsyncThunk} from '@reduxjs/toolkit';

import {listAvailableApplications} from '../api/applications/thunks';
import {checkUser} from '../api/users/thunks';

export const initializeApplication = createAsyncThunk('init', async ({userId}, {dispatch}) => {
    await Promise.all([dispatch(checkUser(userId)), dispatch(listAvailableApplications())]);
});
