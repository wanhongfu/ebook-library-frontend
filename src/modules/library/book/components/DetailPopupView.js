import React, { Component, PropTypes } from 'react';

import {Dialog, FlatButton, TextField, Paper} from 'material-ui';

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

    handleCancel = () => {
        this.setState({showDialog: false});
        const {onCancel} = this.props;
        onCancel();
    };

    handleOK = () => {
        this.setState({showDialog: false});
        const {onOk} = this.props;
        onOk();
    };

    handleChange = field => event => {
        event.preventDefault();
        const inputVal = event.target.value || '';
        if(inputVal.trim().length > 0){
            this.setState({
                currentBook: {
                    ...this.state.currentBook,
                    [field]: inputVal
                }
            });
        }
    }

    renderIdTextField() {
        if(this.props.readonly) {
            return (<div><TextField fullWidth={true} disabled={true} hintText="ID" floatingLabelText="ID" defaultValue={this.state.currentBook.id}/><br /></div>);
        }
    }

    render() {

        const actions = [
            <FlatButton
                label="取消"
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOK}
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
                <Paper zDepth={0}>
                    {this.renderIdTextField()}
                    <TextField fullWidth={true} disabled={readonly} hintText="书名"
                               floatingLabelText="书名" defaultValue={this.state.currentBook.title}
                               onChange={this.handleChange('title')}
                    />
                    <br />
                    <TextField fullWidth={true} disabled={readonly} hintText="豆瓣连接"
                               floatingLabelText="豆瓣连接"
                               defaultValue={this.state.currentBook.url}
                               onChange={this.handleChange('url')}
                    />
                    <br />
                </Paper>
            </Dialog>

        );
    }

}

export default BookDetailPopup;
