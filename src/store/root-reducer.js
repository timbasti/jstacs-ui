import {combineReducers} from '@reduxjs/toolkit';

import {reducer as applicationsReducer} from '../api/applications/slice';
import {drawerReducer} from '../api/drawer/slice';
import {reducer as filesReducer} from '../api/files/slice';
import {reducer as routeReducer} from '../api/route/slice';
import {themeReducer} from '../api/theme/slice';
import {reducer as toolExecutionsReducer} from '../api/toolExecutions/slice';
import {toolsReducer} from '../api/tools/slice';
import {reducer as userReducer} from '../api/users/slice';

export const reducer = combineReducers({
    applications: applicationsReducer,
    drawer: drawerReducer,
    files: filesReducer,
    route: routeReducer,
    theme: themeReducer,
    toolExecutions: toolExecutionsReducer,
    tools: toolsReducer,
    user: userReducer
});
