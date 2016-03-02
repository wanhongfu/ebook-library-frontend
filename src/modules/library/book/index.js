import React, { Component, PropTypes } from 'react';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Paper from 'material-ui/lib/paper';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import { BookList } from './components';

class Books extends Component {

    handleAddClick() {
        //alert('ok');
    }

    render() {

        const style = {
            margin: `30px 0px`,
            right: `24px`,
            bottom: `50px`,
            position: "fixed"
        };

        return (

            <div>
                <BookList />

                <Paper circle={true} >
                    <FloatingActionButton style={style} secondary={true}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>
            </div>
        );

    }

}

export default Books;