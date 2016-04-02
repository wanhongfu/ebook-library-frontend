import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reset} from 'redux-form';

import { ContentAdd, ActionList, ActionViewModule } from 'material-ui/lib/svg-icons';
import { Toolbar, ToolbarGroup, IconButton, Snackbar } from 'material-ui';

import Common from '../../../../common';

import ListView from '../components/ListView';
import GridView from '../components/GridView';
import DetailPopupView from '../components/DetailPopupView';
import DetailEditorView from '../components/DetailEditorView';
import { fetchBooks, saveBook, resetSaveBookState } from '../actions';


//TODO refactor this method to a common place for reuse
function mkPaginationAndSoreQueryParam2(page, size, sort=null) {
    return {
        page: page-1,
        size: size,
        sort: sort
    }
}
function mkPaginationAndSoreQueryParam(page, sort=null) {
    return {
        page: page-1,
        size: 10,
        sort: sort
    }
}

@connect(state => ({
    bookState: state.bookState,
    authcState: state.authc,
}), {
    fetchBooks, saveBook, resetSaveBookState, reset
})
class List extends Component {

    // static propTypes = {
    //     books: PropTypes.arrayOf(PropTypes.shape({
    //             id: PropTypes.number.isRequired,
    //             title: PropTypes.string.isRequired,
    //             url: PropTypes.string.isRequired,
    //             status: PropTypes.string.isRequired,
    //             onboardDate: PropTypes.string.isRequired,
    //             owner: PropTypes.shape({
    //                 id: PropTypes.number.isRequired,
    //                 name: PropTypes.string.isRequired,
    //                 email: PropTypes.string.isRequired
    //             })
    //         })
    //     ),
    // }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            viewType: 'grid',
            showDetailPopup: false,
            showEditorPopup: false,
            currentBook: null
        }
    }

    componentDidMount() {
        this.props.fetchBooks(mkPaginationAndSoreQueryParam2(1, 5, 'title'));
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.bookState.createdSuccess) {
            this.setState({
                showEditorPopup: false
            });
        }

    }

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

    handleAddClick = () => {
        this.setState({
            showEditorPopup: true
        });
    }

    handleDetailPopupOkClick = (book) => {
        this.setState({
            showDetailPopup: false
        });
    }

    handleEditorPopupOkClick = () => {
        this.refs.newBookFormRef.submit();
    }

    handleEditorPopupCancelClick = () => {
        this.props.resetSaveBookState();
        this.props.reset('new-book-form')
        this.setState({ showEditorPopup: false })
    }

    handleEditorSubmit = (newBookForm) => {
        this.props.saveBook(newBookForm);
    }

    handPageChanged = (page) => {
        this.props.fetchBooks(mkPaginationAndSoreQueryParam2(page, 5, 'title'));
    }

    changeViewType = () => {
        const {viewType} = this.state;
        if('grid' === viewType) {
            this.setState({
                viewType: 'list'
            });
        } else {
            this.setState({
                viewType: 'grid'
            });
        }
    }

    mkEmptyBookObj() {
        return {
            id: null,
            title: null,
            url: null,
            status: null,
            onboardDate: null,
            owner: {
                id: null,
                name: null,
                email: null
            }
        };
    }

    getCurrentViewTypeIcon = () => {
        const {viewType} = this.state;
        if('list' === viewType) {
            return (<IconButton onClick={this.changeViewType}><ActionList /></IconButton>);
        } else {
            return (<IconButton onClick={this.changeViewType}><ActionViewModule /></IconButton>);
        }
    }

    renderDataList() {
        const {error} = this.props.bookState;
        if(error !== null) {
            return ( <Snackbar open={true} message={error.message} /> );
        }

        const { totalRecNum, currentPage, pageSize } = this.props.bookState;
        const { isAuthenticated, currentUser } = this.props.authcState;

        const viewProps = {
            books: this.props.bookState.books,
            isAuthenticated: isAuthenticated,
            currentUser: currentUser,
            onViewBookDetail: ::this.handleViewBookDetail,
            onViewBookDetailPopup: ::this.handleViewBookDetailPopup,
        };
        return ('list' === this.state.viewType) ?
               ( <GridView {...viewProps} /> ) :
               ( <ListView onPageChanged={this.handPageChanged}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           totalRecNum={totalRecNum}
                           {...viewProps}
                />);

    }

    renderToolbar() {
        const style = {
            height: `48px`,
        }
        return (
            <Toolbar style={style}>
                <ToolbarGroup>
                    {this.getCurrentViewTypeIcon()}
                </ToolbarGroup>
            </Toolbar>
        );
    }

    renderDetailPopup() {
        const { showDetailPopup, currentBook } = this.state;
        return (
            <DetailPopupView
                open={showDetailPopup}
                book={currentBook}
                onOk={this.handleDetailPopupOkClick}
            />
        );
    }

    renderDetailEditorPopup(){
        return (
            <DetailEditorView
                open={this.state.showEditorPopup}
                ref="newBookFormRef"
                onSubmit={this.handleEditorSubmit}
                onOk={this.handleEditorPopupOkClick}
                onCancel={this.handleEditorPopupCancelClick}
                onReset={()=>{this.props.reset('new-book-form')}}
            />);
    }

    renderMsg() {
        const { createdSuccess, createError } = this.props.bookState;
        if(createdSuccess) {
            return (
                <Snackbar open={true} message={"创建成功"}
                          onRequestClose={()=>{
                                    this.props.resetSaveBookState();
                                    this.props.reset('new-book-form');
                          }}
                />
            );
        } else if(createError && createError !== null) {
            return (<Snackbar open={true} message={createError.response.statusText} />);
        }
    }

    render() {
        if(this.props.bookState.fetching) return ( <Common.Loading /> );
        return (
            <div>
                {this.renderToolbar()}
                {this.renderDataList()}
                {this.renderDetailPopup()}
                {this.renderDetailEditorPopup()}
                {
                    this.props.authcState.isAuthenticated ? <Common.FloatingButton onClick={this.handleAddClick} icon={<ContentAdd />} /> : ''
                }
                {this.renderMsg()}
            </div>
        );
    }
}

export default List;

