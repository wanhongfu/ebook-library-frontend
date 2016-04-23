import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginPopupView from '../components/LoginPopupView';

import { loginUser } from '../actions';

@connect(state => ({
    isAuthenticated : state.authc.isAuthenticated,
    token           : state.authc.token,
    currentUser     : state.authc.currentUser,
    error           : state.authc.error
}), {
    loginUser
})
class Login extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuthenticated) {
            this.context.router.push(`/home`);
        }
    }

    handleLoginOkAction(username, password) {
        this.props.loginUser(username, password);
    }

    handleLoginCancelAction() {
        this.context.router.push(`/home`);
    }

    render() {

        const errMsg = this.props.error ? "不正确用户名或密码, 请重试" : null;

        return (
            <LoginPopupView
                open={true}
                serverError={errMsg}
                onOk={::this.handleLoginOkAction}
                onCancel={::this.handleLoginCancelAction}
            />
        );
    }
}

export default Login;