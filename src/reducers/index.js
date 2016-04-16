import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';

import { listBooksReducer, editBookReducer, viewBookReducer } from '../modules/library/book/reducers';
import { authc } from '../modules/authc/reducers';
import { user } from '../modules/user/reducers';

const rootReducer = combineReducers({
    listBooks      : listBooksReducer,
    editBook       : editBookReducer,
    viewBook       : viewBookReducer,
    authc,
    user,
    form            : formReducer,
    routing         : routerReducer
});

export default rootReducer;