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

    state = {
        previewUrl: undefined
    }

    onDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        const max = Math.min(droppedFiles.length, 1);
        for (let i = 0; i < max; i++) {
            const file = droppedFiles[i];
            this.setState({previewUrl: window.URL.createObjectURL(file)});
            break;
        }
    }

    handleUploadZoneClick = (e) => {
        this.fileInputEl.click();
    }

    render() {

        const uploadZoneStyle = {
            width: 200,
            height: 200,
            borderWidth: 2,
            borderColor: '#666',
            borderStyle: 'dashed',
            borderRadius: 5
        };

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
                    <input
                        accept="image/*"
                        type="file"
                        {...icon}
                        onChange={this.onDrop}
                        ref={el => this.fileInputEl = el}
                        value={null}
                    />

                    <div
                        style={uploadZoneStyle}
                        onClick={this.handleUploadZoneClick}
                    >
                        { this.state.previewUrl ? (<p><img src={this.state.previewUrl} width={`200px`} height={`200px`} /></p>) : null }

                    </div>

                    {icon.touched && icon.error ? icon.error : ''}

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