import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, ME_FROM_TOKEN } from './actions';
import { createReducer } from '../../utils';

const initialState = {
    isAuthenticated : false,
    token           : null,
    currentUser     : null,
    error           : null
};

const authc = createReducer(initialState, {

    [LOGIN_SUCCESS] : (state, payload) => {
        return { ...state,
            isAuthenticated : true,
            token           : payload.token,
            currentUser     : payload.user };
    },

    [LOGIN_FAILURE] : (state, payload) => {
        return { ...state,
            isAuthenticated : false,
            currentUser     : payload.user,
            error           : payload.error };
    },

    [LOGOUT_SUCCESS] : (state, payload) => {
        return { ...state,
            isAuthenticated : false,
            token           : null,
            currentUser     : null };
    },

    [ME_FROM_TOKEN] : (state, payload) => {
        return { ...state,
            isAuthenticated : true,
            token           : payload.token,
            currentUser     : payload.user };
    }

});

export { authc };