import React, { Component, PropTypes } from 'react';

import TopMenuBar from './components/TopMenu';
import LeftMenu from './components/LeftMenu';

import { Colors, getMuiTheme, Spacing } from 'material-ui/lib/styles';

class RootApp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            muiTheme: getMuiTheme()
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

    getStyles() {

        const styles = {
            app: {
                backgroundColor: Colors.grey100
            },
            topMenuBarStyle: {
                position: 'fixed',
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
                backgroundColor: Colors.blue900,
                minHeight: 64,
                paddingTop: 5,
                paddingLeft: 24
            },
            topMenuTitleStyle: {
                paddingLeft: 20,
                //position: "auto",
                color: Colors.grey50
            }
        }
        return styles;
    }

    render() {

        const styles = this.getStyles();
        const leftMenuStyle = { zIndex: styles.topMenuBarStyle.zIndex - 1 };
        return (
            <div id="app" style={styles.app}>
                <TopMenuBar title="eBook Library" topMenuBarStyle={styles.topMenuBarStyle} topMenuTitleStyle={styles.topMenuTitleStyle} />

                <LeftMenu style={leftMenuStyle} />
            </div>
        );
    }

}

export default RootApp;