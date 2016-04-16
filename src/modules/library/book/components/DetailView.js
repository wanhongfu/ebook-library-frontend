import React, { Component, PropTypes } from 'react';

import { Toolbar, ToolbarGroup, IconButton, ToolbarSeparator, TextField, ToolbarTitle } from 'material-ui';
import { NavigationArrowBack } from 'material-ui/lib/svg-icons';

class DetailView extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        readonly: PropTypes.bool.isRequired,
        onBackClick: PropTypes.func
    }

    render() {
        const { book, readonly } = this.props;

        return (
            <div>

                <Toolbar style={{height: `48px`}}>
                    <ToolbarGroup float="left">
                        <IconButton onClick={this.props.onBackClick}><NavigationArrowBack /></IconButton>
                        <ToolbarTitle text="查看图书详情" />
                    </ToolbarGroup>
                </Toolbar>

                <TextField fullWidth={true} disabled={readonly} hintText="ID" floatingLabelText="ID" defaultValue={book.id}/><br />
                <TextField fullWidth={true} disabled={readonly} hintText="书名" floatingLabelText="书名" defaultValue={book.title}/><br />
                <TextField fullWidth={true} disabled={readonly} hintText="豆瓣连接" floatingLabelText="豆瓣连接" defaultValue={book.url}/><br />
            </div>
        );
    }
}

export default DetailView;
