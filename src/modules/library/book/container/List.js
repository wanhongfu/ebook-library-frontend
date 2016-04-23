import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reset} from 'redux-form';
import _ from 'lodash';

import { ContentAdd, ActionList, ActionViewModule } from 'material-ui/lib/svg-icons';
import { IconButton, Snackbar, RaisedButton } from 'material-ui';

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
    listBooksState  : state.listBooks,
    editBookState   : state.editBook,
    authcState      : state.authc,
}), {
    fetchBooks, saveBook, resetSaveBookState, reset
})
class List extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    state = {
        viewType        : 'grid',
        showDetailPopup : false,
        showEditorPopup : false,
        currentBook     : null
    }

    componentDidMount() {
        this.props.fetchBooks(mkPaginationAndSoreQueryParam2(1, 5, 'title'));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.editBookState.savedSuccess) {

            if(this.state.showEditorPopup){
                const { currentPage } = this.props.listBooksState;
                this.props.fetchBooks(mkPaginationAndSoreQueryParam2(currentPage, 5, 'title'));
            }

            this.setState({
                showEditorPopup : false,
                currentBook     : null
            });
        }
    }

    handleViewDetailAction = (bookId) => {
        //this.props.history.push(`/books/${bookId}`);//for react-router v1.0.x, deprecated in v2.0.0
        this.context.router.push(`/books/${bookId}`);//for react-router v2.0.0
    }

    handleViewDetailPopupAction = (book) => {
        this.setState({
            showDetailPopup : true,
            currentBook     : book
        });
    }

    handleAddAction = () => {
        this.setState({
            showEditorPopup : true,
            currentBook     : null
        });
    }

    handleEditAction = (book) => {
        this.setState({
            showEditorPopup : true,
            currentBook     : book
        });
    }

    handleDetailPopupOkAction = (book) => {
        this.setState({
            showDetailPopup : false,
            currentBook     : null
        });
    }

    handleEditorPopupOkAction = () => {
        this.refs.newBookFormRef.submit();
    }

    handleEditorPopupCancelAction = () => {
        this.props.resetSaveBookState();
        this.props.reset('edit-book-form');
        this.setState({
            showEditorPopup : false,
            currentBook     : null
        });
    }

    handleEditorSubmit = (bookForm) => {
        const { currentBook } = this.state;
        if(currentBook && currentBook.id) {
            bookForm.id = currentBook.id;
        }
        this.props.saveBook(bookForm);
    }

    handPageChanged = (page) => {
        this.props.fetchBooks(mkPaginationAndSoreQueryParam2(page, 5, 'title'));
    }

    resetEditBookStateAndEditorForm = () => {
        this.props.resetSaveBookState();
        this.props.reset('edit-book-form');
    }

    changeViewType = () => {
        const { viewType } = this.state;
        if(_.eq('grid', viewType)) {
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
            id          : null,
            title       : null,
            url         : null,
            doubanId    : null,
            status      : null,
            onboardDate : null,
            owner       : {
                    id      : null,
                    name    : null,
                    email   : null
            }
        };
    }

    getCurrentViewTypeIcon = () => {
        if(_.eq('list', this.state.viewType)) {
            return (<IconButton onClick={this.changeViewType} tooltip="切换为列表视图"><ActionList /></IconButton>);
        } else {
            return (<IconButton onClick={this.changeViewType} tooltip="切换为网格视图"><ActionViewModule /></IconButton>);
        }
    }

    renderDataList() {

        const { error } = this.props.listBooksState;
        if(error != null) {
            return ( <Snackbar open={true} message={error.message} /> );
        }

        const {
            listBooksState  : { totalRecNum, currentPage, pageSize, datalist, fetching },
            authcState      : { isAuthenticated, currentUser }
        } = this.props;

        const viewProps = {
            books                   : datalist,
            isAuthenticated,
            currentUser,
            onViewBookDetail        : this.handleViewDetailAction,
            onViewBookDetailPopup   : this.handleViewDetailPopupAction,
            onEditBook              : this.handleEditAction,
        };

        return 'list' === this.state.viewType ?
               ( <GridView {...viewProps} /> ) :
               (
                   <ListView
                           onPageChanged = {this.handPageChanged}
                           pageSize      = {pageSize}
                           fetching      = {fetching}
                           currentPage   = {currentPage}
                           totalRecNum   = {totalRecNum}
                           {...viewProps}
                    />
               );

    }

    renderToolbar() {
        return <Common.InnerToolbar title="图书列表">
                    {
                        this.props.authcState.isAuthenticated ?
                            <IconButton onClick={this.handleAddAction} tooltip="新图书">
                                <ContentAdd />
                            </IconButton>
                        : null
                    }
                    {this.getCurrentViewTypeIcon()}
               </Common.InnerToolbar>;
    }

    renderDetailPopup() {
        const { showDetailPopup, currentBook } = this.state;
        return (
            <DetailPopupView
                open = {showDetailPopup}
                book = {currentBook}
                onOk = {this.handleDetailPopupOkAction}
            />
        );
    }

    renderDetailEditorPopup(){

        const { currentBook, showEditorPopup } = this.state;
        const initFormValues =  !_.isNil(currentBook) ? {...currentBook} : {...this.mkEmptyBookObj()};

        return <DetailEditorView
                    editMode        = {!_.isNil(currentBook)}
                    open            = {showEditorPopup}
                    ref             = "newBookFormRef"
                    onSubmit        = {this.handleEditorSubmit}
                    onOk            = {this.handleEditorPopupOkAction}
                    onCancel        = {this.handleEditorPopupCancelAction}
                    onReset         = {()=>{this.props.reset('edit-book-form')}}
                    initialValues   = {{...initFormValues}}
               />;
    }

    renderMsg() {
        const { editBookState: { savedSuccess, error } } = this.props;
        if(savedSuccess) {
            return <Snackbar
                        open            = {true}
                        message         = {"保存成功!"}
                        onRequestClose  = {this.resetEditBookStateAndEditorForm}
                   />;
        }

        if(!_.isNil(error)) {
            return <Snackbar open={true} message={error.message} />;
        }
    }

    render() {
        const { authcState } = this.props;

        return (
            <div>
                {this.renderDetailPopup()}
                {this.renderDetailEditorPopup()}
                {this.renderToolbar()}
                {this.renderDataList()}

                {
                    authcState.isAuthenticated ? <Common.FloatingButton onClick={this.handleAddAction} icon={<ContentAdd />} /> : null
                }

                {this.renderMsg()}
            </div>
        );

    }
}

export default List;