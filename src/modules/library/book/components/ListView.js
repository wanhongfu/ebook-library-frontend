import React, { Component, PropTypes } from 'react';

import { NavigationMoreVert, ActionDelete, ImageEdit, FileFileUpload } from 'material-ui/lib/svg-icons';
import {
    Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn,
    TableBody, TableFooter, IconButton, IconMenu, MenuItem
} from 'material-ui';

import Common from '../../../../common';

class BookListView extends Component {

    static propTypes = {
        isAuthenticated         : PropTypes.bool.isRequired,
        currentUser             : PropTypes.string,
        books                   : PropTypes.array,
        fetching                : PropTypes.bool,
        onViewBookDetail        : PropTypes.func,
        onViewBookDetailPopup   : PropTypes.func,
        onEditBook              : PropTypes.func,
        onDeleteBook            : PropTypes.func,
        onUploadBookIcon        : PropTypes.func,

        onPageChanged   : PropTypes.func,
        currentPage     : PropTypes.number,
        totalRecNum     : PropTypes.number,
        pageSize        : PropTypes.number,
    }

    static defaultProps = {
        isAuthenticated : false,
        fetching        : true
    }

    constructor(props) {
        super(props);
    }

    handlePageClick = (page) => {
        const {onPageChanged} = this.props;
        if(onPageChanged) {
            onPageChanged(page);
        }
    }

    renderBookActionMenuItem(title, book, requireAuth, clickHander, rightIcon = null) {
        const disabled = requireAuth && !this.props.isAuthenticated;
        return (<MenuItem primaryText={title} onClick={ disabled ? null : clickHander } disabled={ disabled } rightIcon={rightIcon}/>);
    }

    renderBookActionMenus(book) {
        const {onViewBookDetail, onViewBookDetailPopup, onEditBook, onDeleteBook, onUploadBookIcon} = this.props;
        return (
            <IconMenu
                iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                {this.renderBookActionMenuItem('详细信息', book, false, onViewBookDetail.bind(this, book.id))}
                {this.renderBookActionMenuItem('详细信息(Popup)', book, false, onViewBookDetailPopup.bind(this, book))}
                {/*this.renderBookActionMenuItem('借阅', book, true, ()=>{})*/}
                {this.renderBookActionMenuItem('修改', book, true, onEditBook.bind(this, book), <ImageEdit />)}
                {this.renderBookActionMenuItem('删除', book, true, onDeleteBook.bind(this, book), <ActionDelete />)}
                {this.renderBookActionMenuItem('上传封面', book, true, onUploadBookIcon.bind(this, book), <FileFileUpload />)}
            </IconMenu>
        );
    }

    renderBodyRows() {
        if(this.props.fetching) return <Common.Loading />;

        const rowStyle = {width: `30%`, textAlign: 'left'};
        const rowContent = this.props.books.map(book => (
            <TableRow key={book.id}>
                <TableRowColumn style={rowStyle} >{book.id}</TableRowColumn>
                <TableRowColumn style={rowStyle} >{book.title}</TableRowColumn>
                <TableRowColumn style={rowStyle} >{book.url}</TableRowColumn>
                <TableRowColumn style={rowStyle} >{book.status}</TableRowColumn>
                <TableRowColumn style={rowStyle} >{book.onboardDate}</TableRowColumn>
                <TableRowColumn style={rowStyle} >{book.owner.name}</TableRowColumn>
                <TableRowColumn style={rowStyle} >
                    { this.renderBookActionMenus(book) }
                </TableRowColumn>
            </TableRow>)
        );
        return (
            <TableBody displayRowCheckbox={false}>
                {rowContent}
            </TableBody>
        );
    }

    renderTableHeader() {

        const headerStyle = {width: `30%`, textAlign: 'left'};
        const headerTitle = ['ID', '书名', '豆瓣连接', '状态', '上架日期', '上传者', ' '];
        const tableHeaders = headerTitle.map((t, index) => (<TableHeaderColumn key={index} style={headerStyle}>{t}</TableHeaderColumn>));

        return (
            <TableHeader displaySelectAll={false}>
                <TableRow style={{fontSize: 16}}>
                    {tableHeaders}
                </TableRow>
            </TableHeader>
        );
    }

    renderTableFooter() {
        if(this.props.fetching) return null;
        return (
            <TableFooter adjustForCheckbox={true}>
                <TableRow>
                    <TableRowColumn colSpan="7" style={{textAlign: 'right'}}>
                        <Common.Paginator
                            pageSize      =   {this.props.pageSize}
                            currentPage   =   {this.props.currentPage}
                            totalRecNum   =   {this.props.totalRecNum}
                            onPageChange  =   {this.handlePageClick}
                        />
                    </TableRowColumn>
                </TableRow>
            </TableFooter>
        );
    }

    render() {

        return (
            <Common.FineContentDiv>
                <Table>
                    {this.renderTableHeader()}
                    {this.renderBodyRows()}
                    {this.renderTableFooter()}
                </Table>
            </Common.FineContentDiv>
        );
    }
}

export default BookListView;