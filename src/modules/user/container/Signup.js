import React, { Component, PropTypes } from 'react';
import {reset} from 'redux-form';
import {connect} from 'react-redux';

import {Snackbar} from 'material-ui';

import SignupView from '../components/SignupView';
import {signupUser, resetSignupState} from '../actions';

@connect(state => ({
    signupSuccess: state.user.signupSuccess,
    signupMsg: state.user.signupMsg
}), {
    signupUser, resetSignupState, reset
})
class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signupMsg: null,
            signupSuccess: false
        }
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.signupMsg !== undefined && nextProps.signupMsg !== null) {
            this.setState({
                signupMsg: nextProps.signupMsg,
                signupSuccess: nextProps.signupSuccess
            });
        }
        if(nextProps.signupSuccess) {
            this.props.resetSignupState();
            this.context.router.push(`/home`);
        }
    }

    resetForm = () => {
        this.props.reset('signup-form');
    }

    submitForm = () => {
        this.refs.signupFormRef.submit();
    }

    handleSubmit = (signupForm) => {
        this.props.signupUser(signupForm);
    }

    handleCancelAction = () => {
        this.props.resetSignupState();
        this.context.router.push(`/home`);
    }

    renderErrorMsg() {
        const { signupMsg } = this.state;
        if(signupMsg && signupMsg !== null) {
            return (<Snackbar open={true} message={signupMsg} />);
        }
    }

    render() {
        return (
            <div>
                <SignupView open={true}
                            ref="signupFormRef"
                            onSubmit={this.handleSubmit}
                            onCancel={this.handleCancelAction}
                            onOk={this.submitForm}
                            onReset={this.resetForm}
                />
                {this.renderErrorMsg()}
            </div>
        );
    }
}

export default Signup;