import { parseJSON, checkHttpStatus, createConstants } from '../../../utils';

export const AuthcConstants = createConstants(
    'LOGIN_SUCCESS',
    'LOGIN_FAILURE',

    'LOGOUT_SUCCESS'
);

export function loginUser(username, password) {
    return {
        type: AuthcConstants.LOGIN_SUCCESS,
        payload: {
            token: 'sdfasfadsfasdfasf',
            user: username,
            error: null
        }
    };
}

export function logoutUser() {
    return {
        type: AuthcConstants.LOGOUT_SUCCESS
    };
}


