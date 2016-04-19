import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE, USER_SIGNUP_RESET  } from './actions';
import { createReducer } from '../../utils';

const initialState = {
    signupSuccess: false,
    signupMsg: null,

}
const user = createReducer(initialState, {

    [USER_SIGNUP_SUCCESS]: (state) => {
        return {...state, signupSuccess: true, signupMsg: '用户注册成功'}
    },

    [USER_SIGNUP_FAILURE]: (state, payload) => {
        return {...state, signupSuccess: false, signupMsg: `用户注册失败, 原因: ${payload.error}`}
    },

    [USER_SIGNUP_RESET]: () => {
        return {...initialState}
    }
    
});

export { user };