import './index.css';

import {createBrowserHistory} from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {JstacsAppShell} from './app/jstacs-app-shell';
import * as serviceWorker from './serviceWorker';
import {store} from './store';

export const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <JstacsAppShell />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
