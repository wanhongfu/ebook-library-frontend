import Promise from 'bluebird';

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    console.log(`response.message=${response.message}`);
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
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


