import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import HomeIcon from 'material-ui/lib/svg-icons/action/home';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import {Colors, getMuiTheme, Spacing} from 'material-ui/lib/styles';
import { browserHistory } from 'react-router';

class TopMenuBar extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        topMenuBarStyle: PropTypes.object,
        topMenuTitleStyle: PropTypes.object,
        leftMenuVisibleHandler: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {

        return (
                <Toolbar style={this.props.topMenuBarStyle}>

                    <ToolbarGroup firstChild={true} float="left">
                        <ToolbarTitle text={this.props.title} style={this.props.topMenuTitleStyle}/>
                    </ToolbarGroup>

                    <ToolbarGroup float="right">
                        <IconMenu iconButtonElement={<IconButton><PersonIcon color={Colors.grey50}/></IconButton>}>
                            <MenuItem primaryText="个人信息" onClick={()=>{browserHistory.push("/users");}} leftIcon={<PersonIcon />}/>
                            <Divider />
                            <MenuItem primaryText="显示/隐藏菜单栏" leftIcon={<MenuIcon />} onClick={this.props.leftMenuVisibleHandler}/>
                        </IconMenu>
                        <ToolbarSeparator />
                    </ToolbarGroup>

                    <ToolbarGroup float="right">
                        <IconButton tooltip="首页" onClick={()=>{browserHistory.push("/home");}}><HomeIcon color={Colors.grey50}/></IconButton>
                    </ToolbarGroup>

                </Toolbar>
        );
    }

}

export default TopMenuBar;