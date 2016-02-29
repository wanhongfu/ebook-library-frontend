import React, { Component, PropTypes } from 'react';

import TopMenuBar from './components/TopMenu';
import {Colors} from 'material-ui/lib/styles';

class RootApp extends Component {

    getStyles() {

        const styles = {
            app: {
                backgroundColor: Colors.grey100
            }
        }
        return styles;
    }

    render() {

        const styles = this.getStyles();
        return (
            <div id="app" style={styles.app}>
                <TopMenuBar />
            </div>
        );
    }

}

export default RootApp;