import { parseJSON, checkHttpStatus, createConstants } from '../../../utils';
import api from '../../../api';

export const AuthcConstants = createConstants(
    'LOGIN_SUCCESS',
    'LOGIN_FAILURE',

    'LOGOUT_SUCCESS'
);

export function loginUser(username, password) {

    return (dispatch) => {
        api.authc.login(username, password).then(response => {
            dispatch(loginSuccess(username, response));
        }).catch(error => {
            dispatch(loginFailure(username, error));
        });
    };
}

function loginSuccess(username, response) {
    return {
        type: AuthcConstants.LOGIN_SUCCESS,
        payload: {
            token: response.token,
            user: username,
            error: null
        }
    };
}

function loginFailure(username, error) {
    return {
        type: AuthcConstants.LOGIN_FAILURE,
        payload: {
            token: null,
            user: username,
            error: error
        }
    };
}

export function logoutUser() {
    return {
        type: AuthcConstants.LOGOUT_SUCCESS
    };
}


