import {createSlice} from '@reduxjs/toolkit';
import {
    openDrawer,
    closeDrawer
} from './reducers';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        open: false
    },
    reducers: {
        openDrawer,
        closeDrawer
    }
});

export const drawerReducer = drawerSlice.reducer;
