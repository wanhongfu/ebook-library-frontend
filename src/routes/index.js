import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from '../modules/layout/container/MainLayout';
import Home from '../modules/layout/container/Home';
import * as Book from '../modules/library/book';
import Users from '../modules/user';
import Login from '../modules/authc/container/Login';
import Signup from '../modules/user/container/Signup';

import { fillStore } from '../utils';

const appRouters = (

    <Route path="/" component={MainLayout}>

        <IndexRoute component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/books" component={Book.List} />
        <Route path="/books/:id" component={Book.View} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route requireAuth>
            <Route path="/users" component={Users} />
        </Route>

    </Route>

);

function walk(routes, cb) {
    cb(routes);

    if (routes.childRoutes) {
        routes.childRoutes.forEach(route => walk(route, cb));
    }

    return routes;
}

export default(store) => {
    return walk(Route.createRouteFromReactElement(appRouters), route => {

        route.onEnter = (nextState, replace) => {

            const loggedIn = !!store.getState().authc.isAuthenticated;
            if (route.requireAuth && !loggedIn) {
                replace('/login');
            } else {
                //fillStore is no longer required as we can load init
                // data for component from lifecycle method componentDidMount(),
                //will be removed later
                fillStore(store, nextState, [route.component]);
            }
        };
    });
};