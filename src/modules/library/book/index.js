import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Snackbar from 'material-ui/lib/snackbar';

import Paper from 'material-ui/lib/paper';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { fetchBooks } from './actions';

import { BookList, BookDetail } from './components';


@connect(state => ({
    fetching: state.bookReducer.fetching,
    books: state.bookReducer.books,
    error: state.bookReducer.error
}))
class Books extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        fetching: PropTypes.bool,
        books: PropTypes.array,
        error: PropTypes.object,
    }

    constructor(props) {
        super(props);
        //this.props.dispatch(fetchBooks());
        if(!this.props.books) this.props.books = [];

        this.state = {
            showBookDetail: false,
            currentBook: {
                title: null,
                url: null
            }
        }
    }

    static fillStore(redux) {
        return redux.dispatch(fetchBooks());
    }

    handleAddClick() {
        this.setState({
            showBookDetail: true
        });
    }

    viewDetailAction(bookId) {
        alert(bookId);
        this.setState({
            showBookDetail: true,
            currentBook: {
                title: 'xxxx',
                url: 'ssss'
            }
        });
    }

    bookDetailOkCallback() {
        this.setState({
            showBookDetail: false
        });
    }

    bookDetailCancelCallback() {
        this.setState({
            showBookDetail: false
        });
    }


    render() {

        const style = {
            margin: `30px 0px`,
            right: `24px`,
            bottom: `50px`,
            position: "fixed"
        };

        const content = this.props.error === null ?
                            ( <BookList books={this.props.books} viewDetailAction={::this.viewDetailAction}/> ) :
                            ( <Snackbar open={true} message={this.props.error.message} action="重试" /> );

        return (

            <div>
                {content}
                <Paper circle={true} >
                    <FloatingActionButton style={style} secondary={true} onClick={::this.handleAddClick}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>

                <BookDetail show={this.state.showBookDetail}
                            book={this.state.currentBook}
                            okCallback={::this.bookDetailOkCallback}
                            cancelCallback={::this.bookDetailCancelCallback}
                />

            </div>
        );
    }
}

//const mapStateToProps = (state) => {
//    return {
//        books: state.bookReducer.books,
//        error: state.bookReducer.error
//    };
//};
//
//export default connect(mapStateToProps)(Books);
export default Books;