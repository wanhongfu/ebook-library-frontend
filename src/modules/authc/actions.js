import { parseJSON, checkHttpStatus, createConstants } from '../../utils';
import api from '../../api';

export const LOGIN_SUCCESS = "authc/login/success";
export const LOGIN_FAILURE = "authc/login/failure";
export const LOGOUT_SUCCESS = "authc/logout/success";
export const ME_FROM_TOKEN = "authc/token/login"

export function loadUserFromToken() {
    return (dispatch) => {

        //TODO need to handle token validation in other common place for reuse
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length <= 0) return;

        api.authc.loadAccountByToken(_token).then(response => {
            dispatch({
                type    : ME_FROM_TOKEN,
                payload : {
                    token   : _token,
                    user    : response.email
                }
            });
        }).catch(error => {});
    }
}

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
        type    : LOGIN_SUCCESS,
        payload : {
            token   : token,
            user    : username
        }
    };
}

function loginFailure(username, error) {
    return {
        type    : LOGIN_FAILURE,
        payload : {
            user    : username,
            error   : error
        }
    };
}

export function logoutUser() {
    return (dispatch) => {
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length > 0) {
            api.authc.logout(_token).catch(error => {});
            sessionStorage.removeItem('token');
        }
        dispatch({
            type: LOGOUT_SUCCESS
        });
    }
}


