import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootApp from '../modules/common/layout';
import Home from '../modules/common/Home';
import * as Book from '../modules/library/book';
import Users from '../modules/user';

import { fillStore } from '../utils';

const appRouters = (

    <Route component={RootApp}>
        <Route path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/users" component={Users} />
        <Route path="/books" component={Book.List} />
        <Route path="/books/:id" component={Book.View} />
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
        route.onEnter = (nextState) => {
            fillStore(store, nextState, [route.component]);
        };
    });
};

//export default (store, client) => {
//    return walk(Route.createRouteFromReactElement(routes), route => {
//        route.onEnter = (nextState, transition) => {
//            const loggedIn = !!store.getState().auth.token;
//
//            if (route.requireAuth && !loggedIn) {
//                transition.to(...redirectBackAfter('/login', nextState));
//            } else if (client) {
//                fillStore(store, nextState, [route.component]);
//            }
//        };
//    });
//};


//export default appRouters;