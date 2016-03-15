import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

class BookDetailPopup extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        show: PropTypes.bool,
        readonly: PropTypes.bool.isRequired,
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            currentBook: {
                title: null,
                url: null
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showDialog: nextProps.show,
            currentBook: nextProps.book
        });
    }

    handleCancel() {
        this.setState({showDialog: false});
        const {onCancel} = this.props;
        onCancel();
    };

    handleOK() {
        this.setState({showDialog: false});
        const {onOk} = this.props;
        onOk();
    };

    render() {

        const actions = [
            <FlatButton
                label="取消"
                onTouchTap={::this.handleCancel}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={::this.handleOK}
            />
        ];

        const {readonly} = this.props;

        return (
            <Dialog
                title="新图书"
                actions={actions}
                modal={false}
                open={this.state.showDialog}
                onRequestClose={::this.handleCancel}
            >
                <div>
                    <TextField disabled={readonly} hintText="ID" floatingLabelText="ID" defaultValue={this.state.currentBook.id}/><br />
                    <TextField disabled={readonly} hintText="书名" floatingLabelText="书名" defaultValue={this.state.currentBook.title}/><br />
                    <TextField disabled={readonly} hintText="豆瓣连接" floatingLabelText="豆瓣连接" defaultValue={this.state.currentBook.url}/><br />
                </div>
            </Dialog>

        );
    }

}

export default BookDetailPopup;
