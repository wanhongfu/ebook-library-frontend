import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../authc/actions';
import { HomeView } from '../components/';

@connect(state => ({
    isAuthenticated: state.authc.isAuthenticated,
    currentUser: state.authc.currentUser,
}))
class Home extends Component {

    render() {
        return(
            <HomeView {...this.props} />
        );
    }
}

export default Home;