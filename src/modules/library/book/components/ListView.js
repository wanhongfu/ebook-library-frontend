import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import { NavigationMoreVert, ActionDelete, ImageEdit } from 'material-ui/lib/svg-icons';
import {
    Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn,
    TableBody, TableFooter, IconButton, IconMenu, MenuItem
} from 'material-ui';

import Common from '../../../../common';

class BookListView extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        currentUser: PropTypes.string,
        books: PropTypes.array,
        onViewBookDetail: PropTypes.func,
        onViewBookDetailPopup: PropTypes.func,

        onPageChanged: PropTypes.func,
        currentPage: PropTypes.number,
        totalRecNum: PropTypes.number,
        pageSize: PropTypes.number,
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
        return (<MenuItem primaryText={title} onClick={clickHander} disabled={disabled} rightIcon={rightIcon}/>);
    }

    renderBookActionMenus(book) {
        const {onViewBookDetail, onViewBookDetailPopup} = this.props;
        return (
            <IconMenu
                iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                {this.renderBookActionMenuItem('详细信息', book, false, onViewBookDetail.bind(this, book.id))}
                {this.renderBookActionMenuItem('详细信息(Popup)', book, false, onViewBookDetailPopup.bind(this, book))}
                {this.renderBookActionMenuItem('借阅', book, true, ()=>{})}
                {this.renderBookActionMenuItem('修改', book, true, ()=>{}, <ImageEdit />)}
                {this.renderBookActionMenuItem('删除', book, true, ()=>{}, <ActionDelete />)}
            </IconMenu>
        );
    }

    render() {

        const rowStyle = {width: `30%`};
        const headerStyle = {fontSize: 16, width: `30%`, align: 'left'};
        const headerTitle = ['ID', '书名', '豆瓣连接', '状态', '上架日期', '上传者', ' '];

        const tableHeaders = headerTitle.map((t, index) => (<TableHeaderColumn key={index} style={headerStyle}>{t}</TableHeaderColumn>));

        const tableBodyRows = this.props.books.map(book => {
            return (
                <TableRow key={book.id} >
                    <TableRowColumn style={rowStyle} >{book.id}</TableRowColumn>
                    <TableRowColumn style={rowStyle} >{book.title}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.url}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.status}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.onboardDate}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.owner.name}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>
                        { this.renderBookActionMenus(book) }
                    </TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Table>
                <TableHeader displaySelectAll={false} >
                    <TableRow>
                        {tableHeaders}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {tableBodyRows}
                </TableBody>
                <TableFooter adjustForCheckbox={true}>
                    <TableRow>
                        <TableRowColumn colSpan="7" style={{textAlign: 'right'}}>
                            <Common.Paginator pageSize={this.props.pageSize}
                                              currentPage={this.props.currentPage}
                                              totalRecNum={this.props.totalRecNum}
                                              onPageChange={this.handlePageClick}
                            />
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}

export default BookListView;