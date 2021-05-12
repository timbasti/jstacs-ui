/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    initialState: {
        openApplication: null,
        section: null,
        view: null
    },
    name: 'route',
    reducers: {
        setRouteData: (state, {payload}) => {
            const {openApplication, section, view} = payload;
            state.openApplication = openApplication ? openApplication : null;
            state.section = section ? section : null;
            state.view = view ? view : null;
        }
    }
});

export const reducer = slice.reducer;

export const {setRouteData} = slice.actions;
