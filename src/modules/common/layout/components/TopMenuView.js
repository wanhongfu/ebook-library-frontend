import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import InputIcon from 'material-ui/lib/svg-icons/action/input';
import PersonOutlineIcon from 'material-ui/lib/svg-icons/social/person-outline';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import AccountBoxIcon from 'material-ui/lib/svg-icons/action/account-box';
import HomeIcon from 'material-ui/lib/svg-icons/action/home';
import ExitToAppIcon from 'material-ui/lib/svg-icons/action/exit-to-app';
import LocalLibraryIcon from 'material-ui/lib/svg-icons/maps/local-library';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import {Colors, getMuiTheme, Spacing} from 'material-ui/lib/styles';
import { browserHistory } from 'react-router';

class TopMenuView extends Component {

    static propTypes = {
        isLoginIn: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        topMenuBarStyle: PropTypes.object,
        topMenuTitleStyle: PropTypes.object,
        onLeftMenuVisibleAction: PropTypes.func,
        onLoginRequest: PropTypes.func,
        onLogoutRequest: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {

        const userMenuItems = this.props.isLoginIn ? (
                <IconMenu iconButtonElement={<IconButton><PersonIcon color={Colors.grey50}/></IconButton>}>
                    <MenuItem primaryText="我的信息" onClick={()=>{browserHistory.push("/users");}} leftIcon={<PersonIcon />}/>
                    <Divider />
                    <MenuItem primaryText="退出登陆" leftIcon={<ExitToAppIcon />} onClick={this.props.onLogoutRequest}/>
                </IconMenu>
            ) : (
                <IconMenu iconButtonElement={<IconButton><PersonOutlineIcon color={Colors.grey50}/></IconButton>}>
                    <MenuItem primaryText="登陆" onClick={this.props.onLoginRequest} leftIcon={<InputIcon />}/>
                    <MenuItem primaryText="注册" leftIcon={<PersonAddIcon />} onClick={()=>{}}/>
                </IconMenu>
            );


        return (
                <Toolbar style={this.props.topMenuBarStyle}>

                    <ToolbarGroup firstChild={true} float="left">
                        <ToolbarTitle text={this.props.title} style={this.props.topMenuTitleStyle}/>
                    </ToolbarGroup>

                    <ToolbarGroup float="right">
                        {userMenuItems}
                        <ToolbarSeparator />
                        <IconButton tooltip="显示/隐藏菜单栏" onClick={this.props.onLeftMenuVisibleAction}><MenuIcon color={Colors.grey50}/></IconButton>
                    </ToolbarGroup>

                    <ToolbarGroup float="right">
                        <IconButton tooltip="首页" onClick={()=>{browserHistory.push("/home");}}><HomeIcon color={Colors.grey50}/></IconButton>
                        <IconButton tooltip="图书" onClick={()=>{browserHistory.push("/books");}}><LocalLibraryIcon color={Colors.grey50}/></IconButton>
                        <IconButton tooltip="用户列表" onClick={()=>{browserHistory.push("/users");}}><AccountBoxIcon color={Colors.grey50}/></IconButton>
                    </ToolbarGroup>

                </Toolbar>
        );
    }

}

export default TopMenuView;