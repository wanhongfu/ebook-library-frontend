import React, { Component, PropTypes } from 'react';

import { Toolbar, ToolbarGroup, ToolbarSeparator, Divider, IconButton, IconMenu, MenuItem } from 'material-ui';
import { SocialPerson, ActionInput, SocialPersonOutline, NavigationMenu,
    SocialPersonAdd, ActionAccountBox, ActionHome, ActionExitToApp,
    MapsLocalLibrary } from 'material-ui/lib/svg-icons';

import {Colors, getMuiTheme, Spacing} from 'material-ui/lib/styles';
import { browserHistory } from 'react-router';



import './layout.css';

class TopMenuView extends Component {

    static propTypes = {
        isLoginIn: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        topMenuBarStyle: PropTypes.object,
        topMenuTitleStyle: PropTypes.object,
        onLeftMenuVisibleAction: PropTypes.func,
        onLoginRequest: PropTypes.func,
        onLogoutRequest: PropTypes.func,
        onSignupRequest: PropTypes.func
    }

    constructor(props) {
        super(props);
    }



    render() {

        const userMenuItems = this.props.isLoginIn ? (
                <IconMenu iconButtonElement={<IconButton><SocialPerson color={Colors.grey50}/></IconButton>}>
                    <MenuItem primaryText="我的信息" onClick={()=>{browserHistory.push("/users");}} leftIcon={<SocialPerson />}/>
                    <Divider />
                    <MenuItem primaryText="退出登陆" leftIcon={<ActionExitToApp />} onClick={this.props.onLogoutRequest}/>
                </IconMenu>
            ) : (
                <IconMenu iconButtonElement={<IconButton><SocialPersonOutline color={Colors.grey50}/></IconButton>}>
                    <MenuItem primaryText="登陆" onClick={this.props.onLoginRequest} leftIcon={<ActionInput />}/>
                    <MenuItem primaryText="注册" leftIcon={<SocialPersonAdd />} onClick={this.props.onSignupRequest}/>
                </IconMenu>
            );


        return (
                <div>
                    <Toolbar style={this.props.topMenuBarStyle}>

                        <ToolbarGroup firstChild={true} float="left">
                            <div className="app-title">
                                P2PLib
                            </div>
                        </ToolbarGroup>

                        <ToolbarGroup float="right">
                            <IconButton tooltip="首页" onClick={()=>{browserHistory.push("/home");}}><ActionHome color={Colors.grey50}/></IconButton>
                            <IconButton tooltip="图书" onClick={()=>{browserHistory.push("/books");}}><MapsLocalLibrary color={Colors.grey50}/></IconButton>
                            <IconButton tooltip="用户列表" onClick={()=>{browserHistory.push("/users");}}><ActionAccountBox color={Colors.grey50}/></IconButton>
                            <ToolbarSeparator />
                            {userMenuItems}
                            <IconButton tooltip="显示/隐藏菜单栏" onClick={this.props.onLeftMenuVisibleAction}><NavigationMenu color={Colors.grey50}/></IconButton>
                        </ToolbarGroup>

                    </Toolbar>

                </div>
        );
    }

}

export default TopMenuView;