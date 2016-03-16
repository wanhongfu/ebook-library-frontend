import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import Subheader from 'material-ui/lib/Subheader';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import { Colors, Spacing, Typography } from 'material-ui/lib/styles';
import zIndex from 'material-ui/lib/styles/zIndex';

import HomeIcon from 'material-ui/lib/svg-icons/action/home';
import ListIcon from 'material-ui/lib/svg-icons/action/list';
import NoteAddIcon from 'material-ui/lib/svg-icons/action/note-add';
import SwapHorizIcon from 'material-ui/lib/svg-icons/action/swap-horiz';
import PersonAddIcon from 'material-ui/lib/svg-icons/social/person-add';
import AccountBoxIcon from 'material-ui/lib/svg-icons/action/account-box';
import LocalLibraryIcon from 'material-ui/lib/svg-icons/maps/local-library';

import { browserHistory } from 'react-router';

class LeftMenuView extends Component {

    static propTypes = {
        style: PropTypes.object,
        open: PropTypes.bool.isRequired
    }

    getStyles() {
        return {
            logo: {
                cursor: 'pointer',
                fontSize: 24,
                color: Typography.textFullWhite,
                lineHeight: `${Spacing.desktopKeylineIncrement}px`,

                backgroundColor: Colors.cyan500,
                paddingLeft: Spacing.desktopGutter,
                marginBottom: 8
            },
        };
    }

    dispatchNewRoute(route) {
        browserHistory.push(route);
    }

    render() {

        const styles = this.getStyles();

        return(
            <LeftNav style={this.props.style}
                     docked={true}
                     open={this.props.open}
                      >
                <div style={styles.logo}>
                    P2PLib
                </div>

                <List>
                    <Subheader>图书馆</Subheader>

                    <ListItem
                        leftIcon={<LocalLibraryIcon />}
                        value="books"
                        primaryText="图书"
                        onClick={() => this.dispatchNewRoute('/books')}
                    />
                </List>

                <Divider />

                <List>
                    <Subheader>系统设置</Subheader>

                    <ListItem
                        leftIcon={<AccountBoxIcon />}
                        value="users"
                        primaryText="用户"
                        onClick={() => this.dispatchNewRoute('/users')}
                    />
                </List>

            </LeftNav>
        );

    }

}

export default LeftMenuView;