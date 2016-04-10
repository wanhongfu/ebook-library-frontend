import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DetailView from '../components/DetailView';
import { fetchSingleBook } from '../actions';

@connect(state => ({
    currnetBookState    : state.currentBook,
}))
class View extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        params: PropTypes.object,
        book: PropTypes.object,
    }

    static fillStore(store, props) {
        if (props.params.id) {
            return store.dispatch(fetchSingleBook(props.params.id));
        }
    }

    render() {
        const { book } = this.props.currnetBookState;
        if(book) {
            return ( <DetailView readonly={true} book={book}/> );
        }
        return (<div />);
    }
}

export default View;