import Promise from 'bluebird';
import _ from 'lodash';

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const body = parseJSON(response);
    const error = new Error(body ? body.message : response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    const ct = response.headers.get('Content-Type');
    if(ct && ct != null) {
        return response.json();
    }
    return response;
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function fillStore(store, nextState, components) {
    return Promise.all(components.map(Component => {
        Component = Component && Component.WrappedComponent || Component;

        if (!Component || !Component.fillStore) { return; }

        Component.fillStore(store, nextState);
    }));

    //return Promise.all(components.map(async Component => {
    //    Component = Component && Component.WrappedComponent || Component;
    //
    //    if (!Component || !Component.fillStore) { return; }
    //
    //    await Component.fillStore(redux, nextState);
    //}));
}

export function findPosRelativeToViewport(obj) {
    var curleft = 0,
        curtop = 0;
    if (obj && obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    var objPos =  [curleft, curtop];

    var curleft = 0,
        curtop = 0;
    if (obj && obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    var scroll =  [curleft, curtop];
    return [objPos[0] - scroll[0], objPos[1] - scroll[1]];
}

