import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {reset} from 'redux-form';
import {connect} from 'react-redux';
import { Dialog, FlatButton, TextField } from 'material-ui';

export const fields = ['title', 'url', 'doubanId'];

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = '书名不能空';
    }
    if (!values.doubanId) {
        errors.doubanId = '豆瓣编号不能空';
    }
    return errors;
};

class DetailEditorView extends Component {

    static propTypes = {
        open: PropTypes.bool,
        fields: PropTypes.object.isRequired,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        onReset: PropTypes.func
    };

    static defaultProps = {
        open: false
    }

    render() {

        const {fields: {title, url, doubanId}, onOk, onCancel, onReset, open} = this.props;

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
                onTouchTap={onOk}
            />
        ];

        return (
            <Dialog
                title="新图书"
                actions={actions}
                open={open}
                onRequestClose={onCancel}
            >
                <div>
                    <TextField fullWidth={true} errorText={title.touched && title.error ? title.error : ''}
                               hintText="请输入书名" floatingLabelText="书名" {...title} />
                    <TextField fullWidth={true} hintText="请输入豆瓣编号" floatingLabelText="豆瓣编号" {...doubanId} />
                    <TextField fullWidth={true} hintText="请输入豆瓣连接" floatingLabelText="豆瓣连接" {...url} />
                </div>
            </Dialog>
        );
    }
}

export default reduxForm({
    form: 'new-book-form',
    fields,
    validate
})(DetailEditorView);