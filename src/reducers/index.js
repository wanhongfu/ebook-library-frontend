import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import bookReducer from '../modules/library/book/reducers';

const rootReducer = combineReducers({
    bookReducer,
    routing
});

export default rootReducer;