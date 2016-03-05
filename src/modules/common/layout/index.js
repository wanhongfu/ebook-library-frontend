import React, { Component, PropTypes } from 'react';

import { TopMenuBar, LeftMenu, Home } from './components';

import { Colors, getMuiTheme, Spacing } from 'material-ui/lib/styles';

import Books from '../../library/book';
import Users from '../../library/user';

class RootApp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            muiTheme: getMuiTheme(),
            leftMenuOpen: true
        }

    }

    static childContextTypes = {
        muiTheme: PropTypes.object
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

    leftMenuVisibleHander() {
        const open = !this.state.leftMenuOpen;
        this.refs.rootDiv.style.paddingLeft = open ? `280px` : `40px`;
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
                position: 'fixed',
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
                backgroundColor: Colors.cyan500,
                //minHeight: 64,
                height: 64,
                paddingTop: 5,
                paddingLeft: 24
            },
            topMenuTitleStyle: {
                paddingLeft: 20,
                //position: "auto",
                color: Colors.grey50
            },
            content: {
                paddingTop: Spacing.desktopKeylineIncrement,
                paddingRight: `80px`,
                paddingLeft: `280px`,
                //minHeight: 400,
                margin: Spacing.desktopGutter,
                display: "block",
                //padding: `10px 40px 40px 40px`,
            },
        }
        return styles;
    }

    render() {

        const styles = this.getStyles();
        //styles.content.paddingLeft = 0;

        const leftMenuStyle = { zIndex: styles.topMenuBarStyle.zIndex - 1 };
        return (
            <div id="app" style={styles.app}>
                <TopMenuBar title="eBook Library"
                            topMenuBarStyle={styles.topMenuBarStyle}
                            topMenuTitleStyle={styles.topMenuTitleStyle}
                            leftMenuVisibleHandler={::this.leftMenuVisibleHander}
                />

                <div ref='rootDiv' style={styles.content}>
                    {this.props.children}
                </div>

                <LeftMenu style={leftMenuStyle} open={this.state.leftMenuOpen}/>
            </div>
        );
    }

}

export default RootApp;