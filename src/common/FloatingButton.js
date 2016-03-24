import React, { Component, PropTypes } from 'react';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Paper from 'material-ui/lib/paper';

const FloatingButton = (props) => {

    const style = {
        margin: `30px 0px`,
        right: `24px`,
        bottom: `50px`,
        position: "fixed"
    };

    return (
        <Paper circle={true} >
            <FloatingActionButton style={style} secondary={true} onClick={::props.onClick}>
                {props.icon}
            </FloatingActionButton>
        </Paper>
    );
}

FloatingButton.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.object
}

export default FloatingButton;