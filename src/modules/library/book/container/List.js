import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Snackbar from 'material-ui/lib/snackbar';
import Paper from 'material-ui/lib/paper';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import Loading from '../../../common/Loading';

import { ListView, DetailPopupView } from '../components';
import { fetchBooks } from '../actions';

@connect(state => ({
    fetching: state.books.fetching,
    books: state.books.books,
    error: state.books.error
}), {
    fetchBooks
})
class List extends Component {

    static propTypes = {
        fetching: PropTypes.bool,
        books: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
                onboardDate: PropTypes.string.isRequired
            })
        ),
        error: PropTypes.object,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            showDetailPopup: false,
            currentBook: {
                id: null,
                title: null,
                url: null,
                status: null,
                onboardDate: null
            }
        }
    }

    componentDidMount() {
        console.debug('Book.List::componentDidMount');
        this.props.fetchBooks();
    }

    //static fillStore(store) {
    //    return store.dispatch(fetchBooks());
    //}

    handleViewBookDetail(bookId) {
        //this.props.history.push(`/books/${bookId}`);//for react-router v1.0.x, deprecated in v2.0.0
        this.context.router.push(`/books/${bookId}`);//for react-router v2.0.0
    }

    handleViewBookDetailPopup(book) {
        this.setState({
            showDetailPopup: true,
            currentBook: book
        });
    }

    handleAddClick() {

    }

    handleDetailPopupOkClick() {
        this.setState({
            showDetailPopup: false
        });
    }

    handleDetailPopupCancelClick() {
        this.setState({
            showDetailPopup: false
        });
    }

    render() {

        const style = {
            margin: `30px 0px`,
            right: `24px`,
            bottom: `50px`,
            position: "fixed"
        };

        let content;

        if(!this.props.fetching) {

            const content1 = this.props.error === null ?
                ( <ListView books={this.props.books}
                                onViewBookDetail={::this.handleViewBookDetail}
                                onViewBookDetailPopup={::this.handleViewBookDetailPopup} />) :
                ( <Snackbar open={true} message={this.props.error.message} /> );

            content =  (
                <div>
                    {content1}
                    <Paper circle={true} >
                        <FloatingActionButton style={style} secondary={true} onClick={::this.handleAddClick}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </Paper>
                    <DetailPopupView show={this.state.showDetailPopup}
                                book={this.state.currentBook}
                                readonly={true}
                                onOk={::this.handleDetailPopupOkClick}
                                onCancel={::this.handleDetailPopupCancelClick}
                    />
                </div>
            );

        } else {
            content = ( <Loading /> );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default List;

