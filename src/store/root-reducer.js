import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router';

import {reducer as applicationsReducer} from '../api/applications/slice';
import {drawerReducer} from '../api/drawer/slice';
import {filesReducer} from '../api/files/slice';
import {testReducer} from '../api/test/slice';
import {themeReducer} from '../api/theme/slice';
import {toolsReducer} from '../api/tools/slice';
import {reducer as userReducer} from '../api/users/slice';
import {history} from './history';

const historyReducer = connectRouter(history);

export const reducer = combineReducers({
    applications: applicationsReducer,
    drawer: drawerReducer,
    files: filesReducer,
    router: historyReducer,
    test: testReducer,
    theme: themeReducer,
    tools: toolsReducer,
    user: userReducer
});
