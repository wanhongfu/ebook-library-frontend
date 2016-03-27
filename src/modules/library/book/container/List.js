import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { ContentAdd, ActionList, ActionViewModule } from 'material-ui/lib/svg-icons';
import { Toolbar, ToolbarGroup, IconButton, ToolbarSeparator, Snackbar } from 'material-ui';

import Common from '../../../../common';

import { ListView, GridView, DetailPopupView } from '../components';
import { fetchBooks } from '../actions';


//TODO refactor this method to a common place for reuse
function mapPaginationState2Props(pageState) {
    return {
        currentPage: pageState.currentPage,
        totalRecNum: pageState.totalRecNum,
        pageSize: pageState.pageSize
    };
}

//TODO refactor this method to a common place for reuse
function mapAuthcState2Props(authcState) {
    return {
        currentUser: authcState.currentUser,
        isAuthenticated: authcState.isAuthenticated,
    }
}

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
    fetching: state.books.fetching,
    books: state.books.books,
    error: state.books.error,

    ...mapAuthcState2Props(state.authc),
    ...mapPaginationState2Props(state.books)
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
        this.props.fetchBooks(mkPaginationAndSoreQueryParam2(1, 5, 'title'));
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

    getCurrentViewTypeIcon = () => {
        const {viewType} = this.state;
        if('list' === viewType) {
            return (<IconButton onClick={this.changeViewType}><ActionList /></IconButton>);
        } else {
            return (<IconButton onClick={this.changeViewType}><ActionViewModule /></IconButton>);
        }
    }

    renderDataList() {
        const { books, isAuthenticated, currentUser, totalRecNum, currentPage, pageSize } = this.props;
        
        const viewProps = {
            books: books,
            isAuthenticated: isAuthenticated,
            currentUser: currentUser,
            onViewBookDetail: ::this.handleViewBookDetail,
            onViewBookDetailPopup: ::this.handleViewBookDetailPopup,
        };
        return ('list' === this.state.viewType) ?
               ( <GridView {...viewProps} /> ) : ( <ListView onPageChanged={this.handPageChanged} pageSize={pageSize} currentPage={currentPage} totalRecNum={totalRecNum} {...viewProps} /> );

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

