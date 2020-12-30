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
        [testThunks.parameterSet.fetch.pending]: (state, action) => {
            console.log(action);
            state.error = null;
            state.processing = true;
        },
        [testThunks.parameterSet.fetch.fulfilled]: (state, action) => {
            const {data: parameterSet} = action.payload;
            state.processing = false;
            state.parameterSet = parameterSet;
        },
        [testThunks.parameterSet.fetch.rejected]: (state, action) => {
            const {data: error} = action.payload; 
            state.error = error;
            state.processing = false;
        },
        [testThunks.parameterSet.post.pending]: (state) => {
            state.error = null;
            state.processing = true;
        },
        [testThunks.parameterSet.post.fulfilled]: (state, action) => {
            const {data: parameterSet} = action.payload;
            state.processing = false;
            state.parameterSet = parameterSet;
        },
        [testThunks.parameterSet.post.rejected]: (state, action) => {
            const {data: error} = action.payload; 
            state.error = error;
            state.processing = false;
        }
    }
});

export const testReducer = testSlice.reducer;
