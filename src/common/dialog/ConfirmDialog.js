import React, { PropTypes } from 'react';

import { Dialog, RaisedButton, FlatButton } from 'material-ui';

const ConfirmDialog = (props) => {

    const actions = [
        <FlatButton
            label="取消"
            onTouchTap={props.onCancel}
            style={{ margin: 12}}
        />,
        <RaisedButton
            label="确定"
            primary={true}
            onTouchTap={props.onSubmit}
            style={{ margin: 12}}
        />
    ];

    return (
        <Dialog
            title   = {props.title}
            actions = {actions}
            open    = {props.open}
            onRequestClose  = {props.onCancel}
        >
            {props.message}
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    onCancel    : PropTypes.func,
    onSubmit    : PropTypes.func,
    open        : PropTypes.bool,
    title       : PropTypes.string,
    message     : PropTypes.string
};

export default ConfirmDialog;