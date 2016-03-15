import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { books } from '../modules/library/book/reducers';

const rootReducer = combineReducers({
    books,
    routing
});

export default rootReducer;