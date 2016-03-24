import React, { Component, PropTypes } from 'react';

import { MainLayoutView } from '../components/';

class MainLayout extends Component {

    render() {
        return (<MainLayoutView >{this.props.children}</MainLayoutView>)
    }

}

export default MainLayout;