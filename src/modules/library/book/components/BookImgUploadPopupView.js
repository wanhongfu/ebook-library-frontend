import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui';

export const fields = ['icon'];

const validate = values => {
    const errors = {};
    if (!values.icon) {
        errors.icon = '请选择要上传的图书图片文件';
    }
    return errors;
};

class BookImgUploadPopupView extends Component {

    static propTypes = {
        open        : PropTypes.bool,
        fields      : PropTypes.object.isRequired,
        onCancel    : PropTypes.func,
        onOk        : PropTypes.func
    }

    static defaultProps = {
        open: false
    }

    render() {

        const { fields: { icon }, onOk, onCancel, open } = this.props;

        const actions = [

            <FlatButton
                label="取消"
                onTouchTap={onCancel}
                style={{ margin: 12}}
            />,
            <RaisedButton
                label="确定"
                primary={true}
                onTouchTap={onOk}
                style={{ margin: 12}}
            />
        ];

        const dialogTitle = '上传图书封面图片';

        return (
            <Dialog
                title={dialogTitle}
                actions={actions}
                open={open}
                onRequestClose={onCancel}
            >
                <form onSubmit={onOk} encType="multipart/form-data">
                    <TextField
                        type="file"
                        fullWidth={true}
                        errorText={icon.touched && icon.error ? icon.error : ''}
                        {...icon}
                        value={null}
                    />
                </form>
            </Dialog>
        );
    }
}

export default reduxForm({
    form: 'edit-book-upload-icon',
    fields,
    validate
})(BookImgUploadPopupView);