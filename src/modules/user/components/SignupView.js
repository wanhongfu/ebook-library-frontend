import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { Dialog, FlatButton, TextField } from 'material-ui';

export const fields = ['email', 'name', 'password'];

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = '用户名不能空';
    }

    if (!values.email) {
        errors.email = '电子邮件不能空';
    }
    if (!values.password) {
        errors.password = '密码不能空';
    }
    return errors;
};

class SignupView extends Component {

    static propTypes = {
        open        : PropTypes.bool,
        fields      : PropTypes.object.isRequired,
        onCancel    : PropTypes.func,
        onOk        : PropTypes.func,
        onReset     : PropTypes.func
    };

    static defaultProps = {
        open: false
    }

    constructor(props) {
        super(props);
    }

    handleSubmit = () => {
        this.props.onOk();
    }

    render() {

        const {fields: {email, name, password}, onCancel, onReset, open} = this.props;

        const actions = [
            <FlatButton
                label="重置"
                onTouchTap={onReset}
            />,
            <FlatButton
                label="取消"
                onTouchTap={onCancel}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
            />
        ];

        return (
            <Dialog
                title           =  "P2PLib - 用户注册"
                actions         =  {actions}
                open            =  {open}
                onRequestClose  =  {onCancel}
            >
                <div>
                    <TextField fullWidth={true}
                               errorText={email.touched && email.error ? email.error : ''}
                               hintText="请输入电子邮件"
                               floatingLabelText="电子邮件"
                               {...email}
                    />
                    <br/>
                    <TextField fullWidth={true}
                               errorText={name.touched && name.error ? name.error : ''}
                               hintText="请输入昵称"
                               floatingLabelText="昵称"
                               {...name}
                    />
                    <br />
                    <TextField fullWidth={true}
                               errorText={password.touched && password.error ? password.error : ''}
                               hintText="请输入登陆密码"
                               type="password"
                               floatingLabelText="密码"
                               {...password}
                    />
                    <br />
                </div>
            </Dialog>
        );
    }

}

export default reduxForm({
    form: 'signup-form',
    fields,
    validate
})(SignupView);