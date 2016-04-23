import React, { Component, PropTypes } from 'react';

import LeftMenuView from './LeftMenuView';
import TopMenu from '../container/TopMenu';

import { Colors, getMuiTheme, Spacing } from 'material-ui/lib/styles';
import DefaultTheme from '../../../config/themes/DefaultTheme';

class MainLayoutView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            muiTheme     : getMuiTheme(),
            leftMenuOpen : true
        }
    }

    static childContextTypes = {
        muiTheme: PropTypes.object
    }

    static childContext = {
        muiTheme: getMuiTheme(DefaultTheme)
    }

    componentWillMount() {
        this.setState({
            muiTheme: this.state.muiTheme
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme
        });
    }

    handleLeftMenuVisibleAction() {
        const open = !this.state.leftMenuOpen;
        this.refs.rootDiv.style.paddingLeft = open ? `257px` : `0px`;
        this.setState({
            leftMenuOpen: open
        });
    }

    getStyles() {

        const styles = {
            app: {
                //backgroundColor: Colors.grey100
            },
            topMenuBarStyle: {
                position    : 'fixed',
                zIndex      : this.state.muiTheme.zIndex.appBar + 1,
                top         : 0,
                width       : `100%`,
                height      : 64,

                paddingTop      : 5,
                paddingLeft     : 24,
                backgroundColor : Colors.cyan500,
            },
            topMenuTitleStyle: {
                paddingLeft : 20,
                color       : Colors.grey50,
                fontSize    : 24,
            },
            content: {
                paddingTop      : 64,
                paddingRight    : `0px`,
                paddingLeft     : `257px`,

                margin      : 0,
                display     : "block",
            },
        }
        return styles;
    }

    render() {

        const styles = this.getStyles();
        const leftMenuStyle = { zIndex: styles.topMenuBarStyle.zIndex - 1 };
        return (
            <div id="app" style={styles.app}>
                <TopMenu topMenuBarStyle    = {styles.topMenuBarStyle}
                         topMenuTitleStyle  = {styles.topMenuTitleStyle}
                         onLeftMenuVisibleAction = {::this.handleLeftMenuVisibleAction}
                />

                <div ref='rootDiv' style={styles.content}>
                    {this.props.children}
                </div>

                <LeftMenuView style = {leftMenuStyle}
                              open  = {this.state.leftMenuOpen}
                              onLeftMenuVisibleAction = {::this.handleLeftMenuVisibleAction}
                />
            </div>
        );
    }

}

export default MainLayoutView;