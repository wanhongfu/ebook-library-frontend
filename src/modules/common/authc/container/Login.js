import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginView from '../components/LoginView';
import LoginPopupView from '../components/LoginPopupView';

import { loginUser } from '../../authc/actions';

@connect(state => ({
    isAuthenticated: state.authc.isAuthenticated,
    token: state.authc.token,
    currentUser: state.authc.currentUser,
    error: state.authc.error
}), {
    loginUser
})
class Login extends Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleLoginOkAction(username, password) {
        this.props.loginUser(username, password);
        this.context.router.push(`/home`);
    }

    handleLoginCancelAction() {
        this.context.router.push(`/home`);
    }

    render() {
        return (
            <LoginPopupView open={true} onOk={::this.handleLoginOkAction} onCancel={::this.handleLoginCancelAction} />
        );
    }

}

export default Login;