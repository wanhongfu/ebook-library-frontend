import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';
import appRoutes from './routes';
import {loadUserFromToken} from './modules/common/authc/actions';

const initialState = {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store)

const Root = (
    <Provider store={store}>
        <Router history={history} routes={appRoutes(store)} />
    </Provider>
);

injectTapEventPlugin();

//auto load login credential from token if it is valid
store.dispatch(loadUserFromToken());

ReactDom.render(Root, document.getElementById('app'));