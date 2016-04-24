import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopMenuView from '../components/TopMenuView';
import { logoutUser } from '../../authc/actions';


@connect(state => ({
    isAuthenticated : state.authc.isAuthenticated,
    token           : state.authc.token,
    currentUser     : state.authc.currentUser,
    error           : state.authc.error
}), {
    logoutUser
})
class TopMenu extends Component {

    static propTypes = {
        topMenuBarStyle         : PropTypes.object,
        topMenuTitleStyle       : PropTypes.object,
        onLeftMenuVisibleAction : PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleLoginAction() {
        this.context.router.push(`/login`);
    }

    handleLogoutAction() {
        this.props.logoutUser();
        this.context.router.push(`/home`);
    }
    
    handleSignupAction() {
        this.context.router.push('/signup');
    }

    render() {

        return (
            <div>
                <TopMenuView isLoginIn              = {this.props.isAuthenticated}
                            title                   = "P2PLib"
                            topMenuBarStyle         = {this.props.topMenuBarStyle}
                            topMenuTitleStyle       = {this.props.topMenuTitleStyle}
                            onLeftMenuVisibleAction = {this.props.onLeftMenuVisibleAction}
                            onLoginRequest          = {::this.handleLoginAction}
                            onLogoutRequest         = {::this.handleLogoutAction}
                            onSignupRequest         = {::this.handleSignupAction}
                />
            </div>

        );
    }
}

export default TopMenu;