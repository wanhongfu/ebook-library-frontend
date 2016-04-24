import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

import DevTools from '../utils/DevTools';

export default function configureStore(initialState) {

    const middleware = [thunkMiddleware, createLogger()];
    // const finalCreateStore = applyMiddleware(...middleware)(createStore);
    // const store = finalCreateStore(rootReducer, initialState);

    const enhancer = compose(
        // Middleware you want to use in development:
        applyMiddleware(...middleware),
        // Required! Enable Redux DevTools with the monitors you chose
        window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    );
    const store = createStore(
       rootReducer,
       initialState,
       enhancer
    );

    if (module.hot) {
    	module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
    	});
    }

    return store;
}