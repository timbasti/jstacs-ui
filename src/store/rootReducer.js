import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router';

import {history} from './history';

import {testReducer} from '../api/test/slice';
import {themeReducer} from '../api/theme/slice';
import {drawerReducer} from '../api/drawer/slice';
import {filesReducer} from '../api/files/slice';

const historyReducer = connectRouter(history);

export const rootReducer = combineReducers({
    test: testReducer,
    router: historyReducer,
    theme: themeReducer,
    drawer: drawerReducer,
    files: filesReducer
});
