import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import HomeIcon from 'material-ui/lib/svg-icons/action/home';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import {Colors, getMuiTheme, Spacing} from 'material-ui/lib/styles';

class TopMenuBar extends Component {

    getStyles() {

        const styles = {
            toolbar: {
                position: 'fixed',
                //zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
                backgroundColor: Colors.blue900,
                minHeight: 64,
                paddingTop: 5,
                paddingLeft: 24
            },
            toolbarTitle: {
                paddingLeft: 24,
                position: "auto",
                color: Colors.grey50,
            }
        }
        return styles;
    }

    render() {
        const styles = this.getStyles();

        return (
                <Toolbar style={styles.toolbar}>
                    <ToolbarGroup firstChild={true} float="left">
                        <Link to="/home"><ToolbarTitle text="eBook Library" style={styles.toolbarTitle}/></Link>
                    </ToolbarGroup>

                    <ToolbarGroup float="right">
                        <IconMenu iconButtonElement={<IconButton><PersonIcon color={Colors.grey50}/></IconButton>}>
                            <MenuItem primaryText="个人信息" leftIcon={<PersonIcon />}/>
                            <Divider />
                            <MenuItem primaryText="退出" />
                        </IconMenu>
                        <ToolbarSeparator />
                    </ToolbarGroup>

                    <ToolbarGroup float="right">
                        <Link to="/home"><IconButton tooltip="首页"><HomeIcon color={Colors.grey50}/></IconButton></Link>
                        <Link to="/signup"><IconButton tooltip="新用户注册"><PersonAddIcon color={Colors.grey50}/></IconButton></Link>
                    </ToolbarGroup>
                </Toolbar>
        );
    }

}

export default TopMenuBar;