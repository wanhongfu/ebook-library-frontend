import React, { Component, PropTypes } from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';

class UserList extends Component {

    render() {

        return (

            <Table>
                <TableHeader>
                    <TableRow >
                        <TableHeaderColumn style={{fontSize: 16}}>用户名</TableHeaderColumn>
                        <TableHeaderColumn style={{fontSize: 16}}>电子邮件</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableRowColumn>wanhong</TableRowColumn>
                        <TableRowColumn>wanhongfu@gmail.com</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>wanhong</TableRowColumn>
                        <TableRowColumn>wanhongfu@gmail.com</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>wanhong</TableRowColumn>
                        <TableRowColumn>wanhongfu@gmail.com</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>

        );

    }

}

export default UserList;