import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/lib/snackbar';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ListIcon from 'material-ui/lib/svg-icons/action/view-list';
import ModuleIcon from 'material-ui/lib/svg-icons/action/view-module';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import IconButton from 'material-ui/lib/icon-button';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';

import Common from '../../../../common';

import { ListView, GridView, DetailPopupView } from '../components';
import { fetchBooks } from '../actions';

@connect(state => ({
    currentUser: state.authc.currentUser,
    isAuthenticated: state.authc.isAuthenticated,
    fetching: state.books.fetching,
    books: state.books.books,
    error: state.books.error,

    currentPage: state.books.currentPage,
    totalRecNum: state.books.totalRecNum
}), {
    fetchBooks
})
class List extends Component {

    //TODO this componet should be refactored to remove all presentation logic

    static propTypes = {
        fetching: PropTypes.bool,
        books: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
                onboardDate: PropTypes.string.isRequired,
                owner: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    email: PropTypes.string.isRequired
                })
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
            viewType: 'grid',
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
        const param = {
            page: 0,
            size: 5
        };
        this.props.fetchBooks(param);
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

    handleAddClick() {
        alert('add');
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

    handPageChanged = (page) => {
        const param = {
            page: page-1,
            size: 5
        };
        this.props.fetchBooks(param);
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

    getCurrentViewTypeIcon = () => {
        const {viewType} = this.state;
        if('list' === viewType) {
            return (<IconButton onClick={this.changeViewType}><ListIcon /></IconButton>);
        } else {
            return (<IconButton onClick={this.changeViewType}><ModuleIcon /></IconButton>);
        }
    }

    renderDataList() {
        const { books, isAuthenticated, currentUser, totalRecNum, currentPage } = this.props;
        console.log(`totalRecNum=${totalRecNum}, current=${currentPage}`)
        const viewProps = {
            books: books,
            isAuthenticated: isAuthenticated,
            currentUser: currentUser,
            onViewBookDetail: ::this.handleViewBookDetail,
            onViewBookDetailPopup: ::this.handleViewBookDetailPopup,
        };
        return ('list' === this.state.viewType) ?
               ( <GridView {...viewProps} /> ) : ( <ListView onPageChanged={this.handPageChanged} currentPage={currentPage} totalRecNum={totalRecNum} {...viewProps} /> );

    }

    renderToolbar() {
        return (
            <Toolbar>
                <ToolbarGroup float="right">
                    <ToolbarSeparator />
                    {this.getCurrentViewTypeIcon()}
                </ToolbarGroup>
            </Toolbar>
        );
    }

    renderDataTable() {
        const {error} = this.props;
        if(error === null) {
            return this.renderDataList();
        } else {
            return ( <Snackbar open={true} message={error.message} /> );
        }
    }

    renderDetailPopup() {
        return (
            <DetailPopupView show={this.state.showDetailPopup}
                                book={this.state.currentBook}
                                readonly={true}
                                onOk={::this.handleDetailPopupOkClick}
                                onCancel={::this.handleDetailPopupCancelClick}
            />
        );
    }

    render() {
        if(this.props.fetching) return ( <Common.Loading /> );
        return (
            <div>
                {this.renderToolbar()}
                {this.renderDataTable()}
                {this.renderDetailPopup()}

                <Common.FloatingButton onClick={this.handleAddClick} icon={<ContentAdd />} />
            </div>
        );
    }
}

export default List;

