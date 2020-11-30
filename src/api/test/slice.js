import {createSlice} from '@reduxjs/toolkit';
import {
    getParameterSetStart,
    getParameterSetSuccess,
    getParameterSetFailure
} from './reducers';

export const testSlice = createSlice({
    name: 'test',
    initialState: {
        error: null,
        processing: false,
        parameterSet: {
            type: null,
            toolName: null,
            errorMessage: null,
            parameters: null
        }
    },
    reducers: {
        getParameterSetStart,
        getParameterSetSuccess,
        getParameterSetFailure
    }
});

export const testReducer = testSlice.reducer;
