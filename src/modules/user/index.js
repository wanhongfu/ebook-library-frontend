import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'

import { FloatingActionButton, FlatButton, Paper, DatePicker, TextField, Dialog } from 'material-ui'
import { SocialPersonAdd, ContentAdd } from 'material-ui/lib/svg-icons';

import { UserList } from './components';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddDiaglog: false
        }
    }

    handleAddDiaglogClose() {
        this.setState({showAddDiaglog: false});
    };

    handleAddDiaglogOpen() {
        this.setState({showAddDiaglog: true});
    };

    render() {

        const style = {
            margin: `30px 0px`,
            right: `24px`,
            bottom: `50px`,
            position: "fixed"
        };

        const actions = [
            <FlatButton
                label="取消"
                onTouchTap={::this.handleAddDiaglogClose}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={::this.handleAddDiaglogClose}
            />
        ];

        return (
            <div>
                <UserList />

                <Paper circle={true} >
                    <FloatingActionButton style={style} secondary={true} onClick={::this.handleAddDiaglogOpen}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>

                <Dialog
                    title="新用户"
                    actions={actions}
                    modal={false}
                    open={this.state.showAddDiaglog}
                    onRequestClose={::this.handleAddDiaglogClose}>
                    <div>
                        <TextField hintText="用户名" floatingLabelText="用户名"/><br />
                        <TextField hintText="电子邮件" floatingLabelText="电子邮件"/><br />
                    </div>
                </Dialog>
            </div>
        );
    }

}

export default connect()(Users);;