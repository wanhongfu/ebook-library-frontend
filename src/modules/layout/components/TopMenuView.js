import React, { Component, PropTypes } from 'react';

import { Toolbar, ToolbarGroup, ToolbarSeparator, Divider, IconButton, IconMenu, MenuItem, ToolbarTitle } from 'material-ui';
import { SocialPerson, ActionInput, SocialPersonOutline, NavigationMenu,
    SocialPersonAdd, ActionAccountBox, ActionHome, ActionExitToApp,
    MapsLocalLibrary } from 'material-ui/lib/svg-icons';

import {Colors} from 'material-ui/lib/styles';
import { browserHistory } from 'react-router';

import './layout.css';

class TopMenuView extends Component {

    static propTypes = {
        isLoginIn       : PropTypes.bool.isRequired,
        title           : PropTypes.string.isRequired,
        topMenuBarStyle : PropTypes.object,
        topMenuTitleStyle       : PropTypes.object,
        onLeftMenuVisibleAction : PropTypes.func,
        onLoginRequest  : PropTypes.func,
        onLogoutRequest : PropTypes.func,
        onSignupRequest : PropTypes.func
    }

    render() {

        const userMenuItems = this.props.isLoginIn ? (

                <IconMenu iconButtonElement={<IconButton><SocialPerson color={Colors.grey50}/></IconButton>}>
                    <MenuItem primaryText="我的信息" onClick={()=>{browserHistory.push("/users");}} leftIcon={<SocialPerson />}/>
                    <Divider />
                    <MenuItem primaryText="退出登陆" leftIcon={<ActionExitToApp />} onClick={this.props.onLogoutRequest}/>
                </IconMenu>
            ) : (
                <div>
                    <IconButton tooltip="登陆" onClick={this.props.onLoginRequest}><ActionInput color={Colors.grey50}/></IconButton>
                    <IconButton tooltip="注册" onClick={this.props.onSignupRequest}><SocialPersonAdd color={Colors.grey50}/></IconButton>
                </div>
            );

        return (
                <div>
                    <Toolbar style={this.props.topMenuBarStyle}>

                        <ToolbarGroup firstChild={true} float="left">
                            <div className="app-title">
                                <IconButton tooltip="显示/隐藏菜单栏" onClick={this.props.onLeftMenuVisibleAction}><NavigationMenu color={Colors.grey50}/></IconButton>
                                <span> P2PLib </span>
                            </div>
                        </ToolbarGroup>
                        

                        <ToolbarGroup float="right">
                            {userMenuItems}
                        </ToolbarGroup>

                    </Toolbar>

                </div>
        );
    }

}

export default TopMenuView;