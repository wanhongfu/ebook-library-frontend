import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DetailView from '../components/DetailView';
import { fetchSingleBook, resetViewBookState } from '../actions';

@connect(state => ({
    viewBookState : state.viewBook,
}),{
    fetchSingleBook, resetViewBookState
})
class View extends Component {

    static propTypes = {
        params: PropTypes.object,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentWillMount() {
        //Important! Always reset that global state back to null when REMOUNT
        this.props.resetViewBookState();
    }

    componentDidMount() {
        this.props.fetchSingleBook(this.props.params.id);
    }

    handBackAction = () => {
        this.context.router.push(`/books`);
    }

    render() {
        const { book } = this.props.viewBookState;
        return ( book ? <DetailView readonly={true} book={book} onBackClick={this.handBackAction} /> : null );
    }
}

export default View;