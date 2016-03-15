import { AuthcConstants } from './actions';
import { createReducer } from '../../../utils';

const initialState = {
    isAuthenticated: false,
    token: null,
    currentUser: null,
    error: null
};

const authc = createReducer(initialState, {

    [AuthcConstants.LOGIN_SUCCESS] : (state, payload) => {
        return { ...state, isAuthenticated: true, token: payload.token, currentUser: payload.user };
    },

    [AuthcConstants.LOGOUT_SUCCESS] : (state, payload) => {
        return { ...state, isAuthenticated: false, token: null, currentUser: null };
    }

});

export { authc };