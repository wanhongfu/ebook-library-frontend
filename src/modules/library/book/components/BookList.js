import React, { Component, PropTypes } from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

class BookList extends Component {

    static propTypes = {
        books: PropTypes.array
    }

    render() {

        const tableRows = this.props.books.map(book => {
            return (
                <TableRow key={book.id}>
                    <TableRowColumn style={{width: `30%`,}}>{book.title}</TableRowColumn>
                    <TableRowColumn style={{width: `30%`,}}>{book.url}</TableRowColumn>
                    <TableRowColumn style={{width: `10%`,}}>{book.status}</TableRowColumn>
                    <TableRowColumn style={{width: `20%`,}}>{book.onboardDate}</TableRowColumn>
                    <TableRowColumn style={{width: `10%`,}}>
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem primaryText="修改" onClick={()=>{alert(`修改${book.id}`);}}/>
                            <MenuItem primaryText="删除" onClick={()=>{alert(`删除${book.id}`);}} />
                        </IconMenu>
                    </TableRowColumn>
                </TableRow>
            );
        });

        return (

            <Table>
                <TableHeader>
                    <TableRow >
                        <TableHeaderColumn style={{fontSize: 16, width: `30%`,}}>书名</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16, width: `30%`,}}>豆瓣连接</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16, width: `10%`,}}>状态</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16, width: `20%`,}}>上架日期</TableHeaderColumn>
                        <TableHeaderColumn style={{width: `10%`,}}>&nbsp;</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>

        );
    }
}

export default BookList;