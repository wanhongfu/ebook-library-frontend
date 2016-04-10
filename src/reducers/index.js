import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';

import { booksReducer, currentBookReducer } from '../modules/library/book/reducers';
import { authc } from '../modules/authc/reducers';
import { user } from '../modules/user/reducers';

const rootReducer = combineReducers({
    books          : booksReducer,
    currentBook    : currentBookReducer,
    authc,
    user,
    form            : formReducer,
    routing         : routerReducer
});

export default rootReducer;