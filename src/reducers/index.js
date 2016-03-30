import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import { books } from '../modules/library/book/reducers';
import { authc } from '../modules/authc/reducers';
import { user } from '../modules/user/reducers';

const rootReducer = combineReducers({
    books,
    authc,
    user,
    form: formReducer,
    routing
});

export default rootReducer;