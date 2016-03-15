import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

class LoginView extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onCancel: PropTypes.func,
        onOk: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            inputUsername: null,
            inputPassword: null
        }
    }

    handleOkAction() {
        this.props.onOk(this.state.inputUsername, this.state.inputPassword);
    }

    handleChange = field => event => {
        this.setState({
            ...this.state,
            [field]: event.target.value
        });
    }

    render() {

        const actions = [
            <FlatButton
                label="取消"
                onTouchTap={this.props.onCancel}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={::this.handleOkAction}
            />
        ];

        return (

            <div>
                <Dialog
                    title="P2PLib - 用户登陆"
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={this.props.onCancel}
                >
                    <div>
                        <TextField hintText="用户名" floatingLabelText="用户名" onChange={this.handleChange('inputUsername')} /><br />
                        <TextField hintText="密码" floatingLabelText="密码" onChange={this.handleChange('inputPassword')} /><br />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default LoginView;