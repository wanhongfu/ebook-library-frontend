import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { TopMenuBar } from '../components';
import LoginView from '../../authc/components/LoginView';

import { loginUser, logoutUser } from '../../authc/actions';


@connect(state => ({
    isAuthenticated: state.authc.isAuthenticated,
    token: state.authc.token,
    currentUser: state.authc.currentUser,
    error: state.authc.error
}), {
    loginUser, logoutUser
})
class TopMenuContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginDialog: false
        }
    }

    static propTypes = {

        isAuthenticated: PropTypes.bool,
        token: PropTypes.string,
        currentUser: PropTypes.string,

        topMenuBarStyle: PropTypes.object,
        topMenuTitleStyle: PropTypes.object,
        onLeftMenuVisibleAction: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleLoginAction() {
        this.setState({
            showLoginDialog: true
        });
    }

    handleLogoutAction() {
        this.props.logoutUser();
        this.context.router.push(`/home`);
    }

    handleLoginCancelAction() {
        this.setState({
            showLoginDialog: false
        });
    }

    handleLoginOkAction(username, password) {
        this.setState({
            showLoginDialog: false
        });
        this.props.loginUser(username, password);
    }

    render() {

        return (
            <div>
                <TopMenuBar isLoginIn={this.props.isAuthenticated}
                            title="P2PLib"
                            topMenuBarStyle={this.props.topMenuBarStyle}
                            topMenuTitleStyle={this.props.topMenuTitleStyle}
                            onLeftMenuVisibleAction={this.props.onLeftMenuVisibleAction}
                            onLoginRequest={::this.handleLoginAction}
                            onLogoutRequest={::this.handleLogoutAction}
                />

                <LoginView open={this.state.showLoginDialog} onOk={::this.handleLoginOkAction} onCancel={::this.handleLoginCancelAction} />
            </div>

        );
    }
}

export default TopMenuContainer;