import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Snackbar from 'material-ui/lib/snackbar';

import Paper from 'material-ui/lib/paper';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import Loading from '../../common/Loading';
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

    constructor(props) {
        super(props);
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
        this.setState({
            showBookDetail: true,
            currentBook: {
                id: bookId,
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

        let content;

        if(!this.props.fetching) {

            const content1 = this.props.error === null ?
                    ( <BookList books={this.props.books} viewDetailAction={::this.viewDetailAction}/> ) :
                    ( <Snackbar open={true} message={this.props.error.message} /> );

            content =  (
                <div>
                    {content1}
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

//const mapStateToProps = (state) => {
//    return {
//        books: state.bookReducer.books,
//        error: state.bookReducer.error
//    };
//};
//
//export default connect(mapStateToProps)(Books);
export default Books;