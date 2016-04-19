import React, { Component, PropTypes } from 'react';

import {Dialog, FlatButton, TextField, Paper} from 'material-ui';

const BookDetailPopup = (props) => {

    const { book, onOk, open } = props;
    const c = { fullWidth: true, disabled: true }

    return (
        <Dialog actions={<FlatButton label="确定" primary={true} keyboardFocused={true} onTouchTap={onOk} />}
                modal={false} open={open && book !== null} title="查看图书详情" onRequestClose={onOk}
        >
            {
                (book && book !== null) ?
                    <Paper zDepth={0}>
                        <TextField floatingLabelText="上传者"  defaultValue={book.owner.name} {...c} />
                        <TextField floatingLabelText="图书ID"  defaultValue={book.id} {...c} />
                        <TextField floatingLabelText="书名"    defaultValue={book.title} {...c} />
                        <TextField floatingLabelText="豆瓣连接" defaultValue={book.url} {...c} />
                        <TextField floatingLabelText="上传日期" defaultValue={book.onboardDate} {...c} />
                    </Paper> : <div />
            }
        </Dialog>
    );
};

BookDetailPopup.propTypes = {
    book: PropTypes.shape({
        id          : PropTypes.number.isRequired,
        title       : PropTypes.string.isRequired,
        url         : PropTypes.string.isRequired,
        status      : PropTypes.string.isRequired,
        onboardDate : PropTypes.string.isRequired,
        owner       : PropTypes.shape({
            id    : PropTypes.number.isRequired,
            name  : PropTypes.string.isRequired,
            email : PropTypes.string.isRequired
        })
    }),
    onOk    : PropTypes.func.isRequired,
    open    : PropTypes.bool
}

export default BookDetailPopup;
