import {createAsyncThunk} from '@reduxjs/toolkit';
import {requests} from './requests';

const fetchParameterSet = createAsyncThunk(
    'test/parameterSet/fetch',
    async () => {
        const response = await requests.parameterSet.fetch();
        return response.data;
    }
);

const postParameterSet = createAsyncThunk(
    'test/parameterSet/post',
    async (parameterSet) => {
        const response = await requests.parameterSet.post(parameterSet);
        return response.data;
    }
);

export const thunks = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet
    }
};
