import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

class BookListView extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        currentUser: PropTypes.string,
        books: PropTypes.array,
        onViewBookDetail: PropTypes.func,
        onViewBookDetailPopup: PropTypes.func
    }

    renderBookActionMenuItem(title, book, requireAuth, clickHander, rightIcon = null) {
        const disabled = requireAuth && !this.props.isAuthenticated;
        return (<MenuItem primaryText={title} onClick={clickHander} disabled={disabled} rightIcon={rightIcon}/>);
    }

    renderBookActionMenus(book) {
        const {onViewBookDetail, onViewBookDetailPopup} = this.props;
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                {this.renderBookActionMenuItem('详细信息', book, false, onViewBookDetail.bind(this, book.id))}
                {this.renderBookActionMenuItem('详细信息(Popup)', book, false, onViewBookDetailPopup.bind(this, book))}
                {this.renderBookActionMenuItem('借阅', book, true, ()=>{})}
                {this.renderBookActionMenuItem('修改', book, true, ()=>{}, <EditIcon />)}
                {this.renderBookActionMenuItem('删除', book, true, ()=>{}, <DeleteIcon />)}
            </IconMenu>
        );
    }

    render() {

        const rowStyle = {width: `30%`};
        const headerStyle = {fontSize: 16, width: `30%`};
        const headerTitle = ['书名', '豆瓣连接', '状态', '上架日期', ' '];

        const tableRows = this.props.books.map(book => {
            return (
                <TableRow key={book.id}>
                    <TableRowColumn style={rowStyle} >{book.title}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.url}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.status}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>{book.onboardDate}</TableRowColumn>
                    <TableRowColumn style={rowStyle}>
                        { this.renderBookActionMenus(book) }
                    </TableRowColumn>
                </TableRow>
            );
        });
        const tableHeaders = headerTitle.map(t => (<TableHeaderColumn style={headerStyle}>{t}</TableHeaderColumn>));
        return (
            <Table>
                <TableHeader>
                    <TableRow >
                        {tableHeaders}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}

export default BookListView;