import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootApp from '../modules/common/layout';
import Home from '../modules/common/Home';
import Books from '../modules/library/book';
import Users from '../modules/library/user';

import { fillStore } from '../utils';

const appRouters = (

    <Route path="/" component={RootApp}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home}/>
        <Route path="users" component={Users} />
        <Route path="books" component={Books} />
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