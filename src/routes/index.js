import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import RootApp from '../modules/common/layout';
import Home from '../modules/common/Home';
import Books from '../modules/library/book';
import Users from '../modules/library/user';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={RootApp}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="users" component={Users} />
            <Route path="books" component={Books} />
        </Route>
    </Router>
);

export default routes;