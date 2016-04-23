import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
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
        editMode    : PropTypes.bool,
        open        : PropTypes.bool,
        fields      : PropTypes.object.isRequired,
        onCancel    : PropTypes.func,
        onOk        : PropTypes.func,
        onReset     : PropTypes.func
    };

    static defaultProps = {
        open: false
    }

    render() {

        const { fields: { title, url, doubanId }, onOk, onCancel, onReset, open, editMode } = this.props;

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

                    <TextField
                           fullWidth={true}
                           errorText={title.touched && title.error ? title.error : ''}
                           floatingLabelText="书名"
                           {...title}
                    />
                    <TextField
                           fullWidth={true}
                           errorText={doubanId.touched && doubanId.error ? doubanId.error : ''}
                           floatingLabelText="豆瓣编号"
                           {...doubanId}
                    />
                    <TextField
                           fullWidth={true}
                           floatingLabelText="豆瓣连接"
                           {...url}
                    />
                </div>
            </Dialog>
        );
    }
}


export default reduxForm({
    form: 'edit-book-form',
    fields,
    validate
})(DetailEditorView);