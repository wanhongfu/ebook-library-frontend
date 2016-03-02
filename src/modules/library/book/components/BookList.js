import React, { Component, PropTypes } from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';

class BookList extends Component {

    render() {

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
                    <TableRow>
                        <TableRowColumn>Big Data日知录</TableRowColumn>
                        <TableRowColumn>http://book.douban.com/subject/25741352/</TableRowColumn>
                        <TableRowColumn>在馆</TableRowColumn>
                        <TableRowColumn>2016-01-02</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Redis设计与实现</TableRowColumn>
                        <TableRowColumn>http://book.douban.com/subject/25741352/</TableRowColumn>
                        <TableRowColumn>在馆</TableRowColumn>
                        <TableRowColumn>2016-01-02</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>DSL实战</TableRowColumn>
                        <TableRowColumn>http://book.douban.com/subject/25741352/</TableRowColumn>
                        <TableRowColumn>在馆</TableRowColumn>
                        <TableRowColumn>2016-01-02</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Java编程思想</TableRowColumn>
                        <TableRowColumn>http://book.douban.com/subject/25741352/</TableRowColumn>
                        <TableRowColumn>在馆</TableRowColumn>
                        <TableRowColumn>2016-01-02</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>

        );

    }

}

export default BookList;