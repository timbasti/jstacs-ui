import {createSlice} from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        open: false
    },
    reducers: {
        open: (state) => {
            state.open = true;
        },
        close: (state) => {
            state.open = false;
        }
    }
});

export const drawerReducer = drawerSlice.reducer;
