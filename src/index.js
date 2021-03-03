import './index.css';

import {ConnectedRouter} from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {JstacsAppShell} from './app/jstacs-app-shell';
import * as serviceWorker from './serviceWorker';
import {store} from './store';
import {history} from './store/history';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <JstacsAppShell />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
