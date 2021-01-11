import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {save, load} from 'redux-localstorage-simple';

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), save({states: ['theme']})],
    preloadedState: load({states: ['theme']})
});
