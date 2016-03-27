import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    const middleware = [thunkMiddleware, createLogger()];
    const finalCreateStore = applyMiddleware(...middleware)(createStore);
    const store = finalCreateStore(rootReducer, initialState);
    
    //const store = createStore(
    //    rootReducer,
    //    initialState,
    //    applyMiddleware(thunk, createLogger())
    //);

    if (module.hot) {
    	module.hot.accept('../reducers', () => {
    		const nextRootReducer = require('../reducers').default;
    		store.replaceReducer(nextRootReducer);
    	});
    }

    return store;
}