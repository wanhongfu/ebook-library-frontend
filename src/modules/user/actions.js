import { createConstants } from '../../utils';
import api from '../../api';

export const USER_SIGNUP_SUCCESS = "user/signup/success";
export const USER_SIGNUP_FAILURE = "user/signup/failure";
export const USER_SIGNUP_RESET   = "user/signup/reset";

export function signupUser(signupForm) {
    return (dispatch) => {

        dispatch(mkResetAction());

        api.authc.create(signupForm).then((response) => {
            dispatch({
                type: USER_SIGNUP_SUCCESS
            });
        }).catch(error => {
            dispatch({
                type: USER_SIGNUP_FAILURE,
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
        type: USER_SIGNUP_RESET
    };
}