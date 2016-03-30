import { createConstants } from '../../utils';
import api from '../../api';

export const UserConstants = createConstants(
    'USER_SIGNUP',
    'USER_SIGNUP_SUCCESS',
    'USER_SIGNUP_FAILURE',
    'USER_SIGNUP_RESET'
);

export function signupUser(signupForm) {
    return (dispatch) => {

        dispatch(mkResetAction());

        api.authc.create(signupForm).then((response) => {
            dispatch({
                type: UserConstants.USER_SIGNUP_SUCCESS
            });
        }).catch(error => {
            dispatch({
                type: UserConstants.USER_SIGNUP_FAILURE,
                payload: {
                    error: error
                }
            });
        });
    }
}

export function resetSignupState() {
    return (dispatch) => {
        dispatch(mkResetAction())
    }
}

function mkResetAction() {
    return {
        type: UserConstants.USER_SIGNUP_RESET
    };
}