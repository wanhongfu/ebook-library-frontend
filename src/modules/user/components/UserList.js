import React, { Component, PropTypes } from 'react';

import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody, TableFooter }  from 'material-ui';

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