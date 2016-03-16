import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

class LoginPopupView extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onCancel: PropTypes.func,
        onOk: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            inputUsername: null,
            inputUsernameErrorMsg: null,
            inputPassword: null,
            inputPasswordErrorMsg: null
        }
    }

    handleOkAction() {
        const inputUsername = this.state.inputUsername || '';
        const inputPassword = this.state.inputPassword || '';

        let usernameErrMsg = null, passwordErrMsg = null, errHit = false;

        if(inputUsername.trim().length === 0) {
            usernameErrMsg = "登陆名不能空";
            errHit = true;
        }

        if(inputPassword.trim().length === 0) {
            passwordErrMsg = "登陆密码不能空"
            errHit = true;
        }

        if(errHit) {
            this.setState({
                inputUsernameErrorMsg: usernameErrMsg,
                inputPasswordErrorMsg: passwordErrMsg
            });
        } else {
            this.props.onOk(this.state.inputUsername, this.state.inputPassword);
        }
    }

    handleChange = field => event => {
        event.preventDefault();
        const inputVal = event.target.value || '';
        if(inputVal.length === 0){

        }
        this.setState({
            ...this.state,
            [field]: inputVal
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

        const {inputUsernameErrorMsg, inputPasswordErrorMsg} = this.state;

        return (

            <div>
                <Dialog
                    title="P2PLib - 用户登陆"
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={this.props.onCancel}
                >
                    <div>
                        <TextField errorText={inputUsernameErrorMsg} hintText="请输入登陆名" floatingLabelText="登陆名" onChange={this.handleChange('inputUsername')} /><br />
                        <TextField errorText={inputPasswordErrorMsg}  hintText="请输入登陆密码" type="password" floatingLabelText="密码" onChange={this.handleChange('inputPassword')} /><br />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default LoginPopupView;