import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {load, save} from 'redux-localstorage-simple';

import {rootReducer} from './rootReducer';

export const store = configureStore({
    middleware: [...getDefaultMiddleware(), save({states: ['theme']})],
    preloadedState: load({states: ['theme']}),
    reducer: rootReducer
});
