import React, { Component, PropTypes } from 'react';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import IconButton from 'material-ui/lib/icon-button';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import TextField from 'material-ui/lib/text-field';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

class BookDetailView extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        readonly: PropTypes.bool.isRequired
    }

    render() {
        const { book, readonly } = this.props;

        return (
            <div>

                <Toolbar>
                    <ToolbarGroup float="left">
                        <IconButton><BackIcon /></IconButton>
                    </ToolbarGroup>
                </Toolbar>

                <TextField fullWidth={true} disabled={readonly} hintText="ID" floatingLabelText="ID" defaultValue={book.id}/><br />
                <TextField fullWidth={true} disabled={readonly} hintText="书名" floatingLabelText="书名" defaultValue={book.title}/><br />
                <TextField fullWidth={true} disabled={readonly} hintText="豆瓣连接" floatingLabelText="豆瓣连接" defaultValue={book.url}/><br />
            </div>
        );
    }
}

export default BookDetailView;
