import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {JstacsAppShell} from './app/jstacs-app-shell';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <JstacsAppShell />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();
