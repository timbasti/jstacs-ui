import {createSlice} from '@reduxjs/toolkit';
import {thunks as testThunks} from './thunks';

export const testSlice = createSlice({
    name: 'test',
    initialState: {
        error: null,
        processing: false,
        parameterSet: {
            type: null,
            toolName: null,
            parameters: null
        }
    },
    reducers: {},
    extraReducers: {
        [testThunks.parameterSet.fetch.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [testThunks.parameterSet.fetch.fulfilled]: (state, action) => {
            const {type, toolName, parameters} = action.payload;
            state.processing = false;
            state.parameterSet = {type, toolName, parameters};
        },
        [testThunks.parameterSet.fetch.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        },
        [testThunks.parameterSet.post.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [testThunks.parameterSet.post.fulfilled]: (state, action) => {
            const {type, toolName, parameters} = action.payload;
            state.processing = false;
            state.parameterSet = {type, toolName, parameters};
        },
        [testThunks.parameterSet.post.rejected]: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        }
    }
});

export const testReducer = testSlice.reducer;
