import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {store} from './store';
import {history} from './store/history';
import * as serviceWorker from './serviceWorker';
import {JstacsAppShell} from './app/jstacs-app-shell';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <JstacsAppShell />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
