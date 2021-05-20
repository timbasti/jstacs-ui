import {createAsyncThunk} from '@reduxjs/toolkit';

import {listApplications} from '../api/applications/thunks';
import {selectUserId} from '../api/users/selectors';
import {checkUser} from '../api/users/thunks';

export const initializeApplication = createAsyncThunk('init', async (args, {dispatch, getState}) => {
    const state = getState();
    const userId = selectUserId(state);
    await Promise.all([dispatch(checkUser(userId)), dispatch(listApplications())]);
});
