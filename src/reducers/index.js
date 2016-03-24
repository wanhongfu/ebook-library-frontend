import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { books } from '../modules/library/book/reducers';
import { authc } from '../modules/authc/reducers';

const rootReducer = combineReducers({
    books,
    authc,
    routing
});

export default rootReducer;