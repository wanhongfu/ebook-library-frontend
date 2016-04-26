import React, { Component, PropTypes } from 'react';
import { Dialog, RaisedButton, TextField, Snackbar, FlatButton } from 'material-ui';

const propTypes = {
    open        : PropTypes.bool.isRequired,
    onCancel    : PropTypes.func,
    onOk        : PropTypes.func,
    serverError : PropTypes.string
}

class LoginPopupView extends Component {

    state = {
        inputUsername           : null,
        inputUsernameErrorMsg   : null,
        inputPassword           : null,
        inputPasswordErrorMsg   : null,
        serverError             : null
    }

    componentDidMount() {
        this.refs.usernameInputboxRef.focus();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.serverError !== undefined && nextProps.serverError !== null) {
            this.setState({ serverError: nextProps.serverError });
        }
    }

    handleOkAction() {
        const inputUsername = this.state.inputUsername || '';
        const inputPassword = this.state.inputPassword || '';
        let usernameErrMsg  = null, passwordErrMsg = null, errHit = false;

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
        if(inputVal.trim().length > 0){
            this.setState({
                ...this.state,
                serverError: null,
                [field]: inputVal
            });
        }
    }

    render() {

        const actions = [
            <FlatButton style={{ margin: 12}}
                label="取消"
                onTouchTap={this.props.onCancel}
            />,
            <RaisedButton style={{ margin: 12}}
                label="确定"
                primary={true}
                onTouchTap={::this.handleOkAction}
            />
        ];

        const {inputUsernameErrorMsg, inputPasswordErrorMsg, serverError} = this.state;

        return (
            <div>
                <Dialog
                    title="P2PLib - 用户登陆"
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={this.props.onCancel}
                >
                    <div>
                        <TextField
                            ref               = 'usernameInputboxRef'
                            errorText         = {inputUsernameErrorMsg}
                            hintText          = "请输入登陆名"
                            floatingLabelText = "登陆名"
                            onChange          = {this.handleChange('inputUsername')}
                        />
                        <br/>
                        <TextField
                            errorText         = {inputPasswordErrorMsg}
                            hintText          = "请输入登陆密码"
                            type              = "password"
                            floatingLabelText = "密码"
                            onChange          = {this.handleChange('inputPassword')}
                        />
                        <br/>
                    </div>
                </Dialog>

                { serverError ? <Snackbar open={true} message={serverError} /> : null }

            </div>
        );
    }
}

LoginPopupView.propTypes = propTypes;

export default LoginPopupView;