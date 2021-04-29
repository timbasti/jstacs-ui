import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {load, save} from 'redux-localstorage-simple';

import {reducer as rootReducer} from './root-reducer';

export const store = configureStore({
    middleware: [...getDefaultMiddleware(), save({states: ['theme', 'user']})],
    preloadedState: load({states: ['theme', 'user']}),
    reducer: rootReducer
});
