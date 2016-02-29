import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
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

const SelectableList = SelectableContainerEnhance(List);

class LeftMenu extends Component {

    static propTypes = {
        style: PropTypes.object
    }

    getStyles() {
        return {
            logo: {
                cursor: 'pointer',
                fontSize: 24,
                color: Typography.textFullWhite,
                lineHeight: `${Spacing.desktopKeylineIncrement}px`,
                fontWeight: Typography.fontWeightLight,
                backgroundColor: Colors.cyan500,
                paddingLeft: Spacing.desktopGutter,
                marginBottom: 8
            },
        };
    }

    render() {

        const styles = this.getStyles();

        return(
            <LeftNav style={this.props.style}
                     docked={true}
                     open={open}
                     containerStyle={{zIndex: zIndex.leftNav - 100}}
            >
                <div style={styles.logo}>
                    eBook Store
                </div>

                <SelectableList subheader="用户" >
                    <Link to="/signup">
                        <ListItem
                            leftIcon={<ListIcon />}
                            value="signup"
                            primaryText="列表"
                        />
                    </Link>
                    <Link to="/signup">
                        <ListItem
                            leftIcon={<PersonAddIcon />}
                            value="signup"
                            primaryText="添加"
                        />
                    </Link>
                </SelectableList>

                <SelectableList subheader="图书" >
                    <Link to="/signup">
                        <ListItem
                            leftIcon={<ListIcon />}
                            value="signup"
                            primaryText="列表"
                        />
                    </Link>

                    <Link to="/signup">
                        <ListItem
                            leftIcon={<NoteAddIcon />}
                            value="signup"
                            primaryText="添加"
                        />
                    </Link>

                    <Link to="/signup">
                        <ListItem
                            leftIcon={<SwapHorizIcon />}
                            value="signup"
                            primaryText="借阅"
                        />
                    </Link>
                </SelectableList>

            </LeftNav>
        );

    }

}

export default LeftMenu;