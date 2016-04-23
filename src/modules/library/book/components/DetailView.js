import React, { Component, PropTypes } from 'react';

import { TextField } from 'material-ui';

class DetailView extends Component {

    static propTypes = {
        book        : PropTypes.object.isRequired,
        readonly    : PropTypes.bool.isRequired
    }

    render() {
        const { book, readonly } = this.props;

        return (
            <div>
                <TextField fullWidth={true} disabled={readonly} hintText="ID" floatingLabelText="ID" defaultValue={book.id}/><br />
                <TextField fullWidth={true} disabled={readonly} hintText="书名" floatingLabelText="书名" defaultValue={book.title}/><br />
                <TextField fullWidth={true} disabled={readonly} hintText="豆瓣连接" floatingLabelText="豆瓣连接" defaultValue={book.url}/><br />
            </div>
        );
    }
}

export default DetailView;
