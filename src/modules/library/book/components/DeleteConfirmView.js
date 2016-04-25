import React, { PropTypes } from 'react';

import { Dialog, RaisedButton, FlatButton } from 'material-ui';

const DeleteConfirmView = (props) => {

    const bookTitle = props.book ? props.book.title : '';

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
            title   = '删除图书'
            actions = {actions}
            open    = {props.open}
            onRequestClose  = {props.onCancel}
        >
            您真的要删除该图书吗?<br/><br/>
            <li>{bookTitle}</li>
        </Dialog>
    );
}

DeleteConfirmView.propTypes = {
    onCancel    : PropTypes.func,
    onSubmit    : PropTypes.func,
    open        : PropTypes.bool,
    book        : PropTypes.object
};

export default DeleteConfirmView;