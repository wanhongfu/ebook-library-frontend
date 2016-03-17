import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { TopMenuView } from '../components';
import LoginPopupView from '../../authc/components/LoginPopupView';

import { loginUser, logoutUser } from '../../authc/actions';


@connect(state => ({
    isAuthenticated: state.authc.isAuthenticated,
    token: state.authc.token,
    currentUser: state.authc.currentUser,
    error: state.authc.error
}), {
    logoutUser
})
class TopMenu extends Component {

    constructor(props) {
        super(props);
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
        this.context.router.push(`/login`);
        //this.setState({
        //    showLoginDialog: true
        //});
    }

    handleLogoutAction() {
        this.props.logoutUser();
        this.context.router.push(`/home`);
    }

    render() {

        return (
            <div>
                <TopMenuView isLoginIn={this.props.isAuthenticated}
                            title="P2PLib"
                            topMenuBarStyle={this.props.topMenuBarStyle}
                            topMenuTitleStyle={this.props.topMenuTitleStyle}
                            onLeftMenuVisibleAction={this.props.onLeftMenuVisibleAction}
                            onLoginRequest={::this.handleLoginAction}
                            onLogoutRequest={::this.handleLogoutAction}
                />

            </div>

        );
    }
}

export default TopMenu;