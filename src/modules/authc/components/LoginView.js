import React, { Component, PropTypes } from 'react';
import { FlatButton, TextField } from 'material-ui';

const propTypes = {
    onCancel : PropTypes.func,
    onOk     : PropTypes.func
};

class LoginView extends Component {

    state = {
        inputUsername : null,
        inputPassword : null
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

        return (
            <div>
                <TextField
                    hintText="用户名"
                    floatingLabelText="用户名"
                    onChange={this.handleChange('inputUsername')}
                />
                <br/>
                <TextField
                    hintText="密码"
                    floatingLabelText="密码"
                    onChange={this.handleChange('inputPassword')}
                />
                <br/>
                <FlatButton label="取消" onTouchTap={this.props.onCancel}  />
                <FlatButton label="确定" primary={true} keyboardFocused={true} onTouchTap={::this.handleOkAction} />
            </div>

        );
    }
}

LoginView.propTypes = propTypes;

export default LoginView;