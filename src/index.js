import React from 'react';
import { render } from 'react-snapshot';
import {Provider} from 'react-redux';

import createStore from './store';
import neo4jDesktopService from './services/neo4jDesktopService';
import App from './components/App';

import 'semantic-ui-css/semantic.min.css';

import './index.css';

const store = createStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

neo4jDesktopService(store);
