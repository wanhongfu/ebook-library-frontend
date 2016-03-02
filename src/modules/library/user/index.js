import React, { Component, PropTypes } from 'react';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Paper from 'material-ui/lib/paper';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import { UserList } from './components';

class Users extends Component {

    render() {

        const style = {
            margin: `30px 0px`,
            right: `24px`,
            bottom: `50px`,
            position: "fixed"
        };

        return (

            <div>
                <UserList />

                <Paper circle={true} >
                    <FloatingActionButton style={style} secondary={true}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>
            </div>
        );

    }

}

export default Users;