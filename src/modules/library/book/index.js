import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Snackbar from 'material-ui/lib/snackbar';

import Paper from 'material-ui/lib/paper';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { fetchBooks } from './actions';

import { BookList } from './components';


@connect(state => ({
    books: state.bookReducer.books,
    error: state.bookReducer.error
}))
class Books extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        books: PropTypes.array,
        error: PropTypes.object,
    }

    constructor(props) {
        super(props);
        //this.props.dispatch(fetchBooks());
        if(!this.props.books) this.props.books = [];
    }

    static fillStore(redux) {
        return redux.dispatch(fetchBooks());
    }

    handleAddClick() {
    }

    render() {

        const style = {
            margin: `30px 0px`,
            right: `24px`,
            bottom: `50px`,
            position: "fixed"
        };

        const content = this.props.error === null ?
                            ( <BookList books={this.props.books} /> ) :
                            ( <Snackbar open={true} message={this.props.error.message } action="重试" /> );

        return (

            <div>
                {content}
                <Paper circle={true} >
                    <FloatingActionButton style={style} secondary={true}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>

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