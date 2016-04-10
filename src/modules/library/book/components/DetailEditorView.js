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
        currentBook : PropTypes.object,
        open        : PropTypes.bool,
        fields      : PropTypes.object.isRequired,
        onCancel    : PropTypes.func,
        onOk        : PropTypes.func,
        onReset     : PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        open: false
    }

    render() {

        const {fields: {title, url, doubanId}, onOk, onCancel, onReset, open, currentBook} = this.props;
        const editMode = currentBook && currentBook !== null;

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

        const dialogTitle = editMode ? '编辑图书信息' : '新图书';

        return (
            <Dialog
                title={dialogTitle}
                actions={actions}
                open={open}
                onRequestClose={onCancel}
            >
                <div>
                    <TextField fullWidth={true}
                               errorText={title.touched && title.error ? title.error : ''}
                               hintText="请输入书名" floatingLabelText="书名" {...title}
                               defaultValue={currentBook ? currentBook.title : ''}
                    />
                    <TextField fullWidth={true}
                               errorText={doubanId.touched && doubanId.error ? doubanId.error : ''}
                               hintText="请输入豆瓣编号" floatingLabelText="豆瓣编号" {...doubanId}
                               defaultValue={currentBook ? currentBook.doubanId : ''}
                    />
                    <TextField fullWidth={true}
                               hintText="请输入豆瓣连接" floatingLabelText="豆瓣连接" {...url}
                               defaultValue={currentBook ? currentBook.url : ''}
                    />
                </div>
            </Dialog>
        );
    }
}

export default reduxForm({
    form: 'new-currentBookReducer-form',
    fields,
    validate
})(DetailEditorView);