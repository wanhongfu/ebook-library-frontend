import React, { Component, PropTypes } from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';

class BookList extends Component {

    static propTypes = {
        books: PropTypes.array
    }

    render() {

        const tableRows = this.props.books.map(book => {
            return (
                <TableRow key={book.id}>
                    <TableRowColumn>{book.title}</TableRowColumn>
                    <TableRowColumn>{book.url}</TableRowColumn>
                    <TableRowColumn>{book.status}</TableRowColumn>
                    <TableRowColumn>{book.onboardDate}</TableRowColumn>
                </TableRow>
            );
        });

        return (

            <Table>
                <TableHeader>
                    <TableRow >
                        <TableHeaderColumn style={{fontSize: 16}}>书名</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16}}>豆瓣连接</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16}}>状态</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16}}>上架日期</TableHeaderColumn>
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