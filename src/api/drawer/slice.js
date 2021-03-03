import {createSlice} from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    initialState: {open: false},
    name: 'drawer',
    reducers: {
        close: (state) => {
            state.open = false;
        },
        open: (state) => {
            state.open = true;
        }
    }
});

export const drawerReducer = drawerSlice.reducer;
