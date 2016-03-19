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
    const token = response.token;

    //store Token to browser session storage
    //If you use localStorage instead of sessionStorage, then this will be persisted across tabs and new windows.
    //sessionStorage just persisted only in current tab
    sessionStorage.setItem('token', token);

    return {
        type: AuthcConstants.LOGIN_SUCCESS,
        payload: {
            token: token,
            user: username
        }
    };
}

function loginFailure(username, error) {
    return {
        type: AuthcConstants.LOGIN_FAILURE,
        payload: {
            user: username,
            error: error
        }
    };
}

export function logoutUser() {
    sessionStorage.setItem('token', null);
    return {
        type: AuthcConstants.LOGOUT_SUCCESS
    };
}


