import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

class LoginView extends Component {

    static propTypes = {
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
        return (

            <div>
                <TextField hintText="用户名" floatingLabelText="用户名" onChange={this.handleChange('inputUsername')} /><br />
                <TextField hintText="密码" floatingLabelText="密码" onChange={this.handleChange('inputPassword')} /><br />

                <FlatButton label="取消" onTouchTap={this.props.onCancel}  />
                <FlatButton label="确定" primary={true} keyboardFocused={true} onTouchTap={::this.handleOkAction} />
            </div>

        );
    }

}

export default LoginView;