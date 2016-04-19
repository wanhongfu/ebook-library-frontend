import React, { Component, PropTypes } from 'react';

import { Paper, FloatingActionButton } from 'material-ui';

const FloatingButton = (props) => {

    const style = {
        margin   : `30px 0px`,
        right    : `24px`,
        bottom   : `50px`,
        position : "fixed"
    };

    return (
        <Paper circle={true} >
            <FloatingActionButton style={style} secondary={true} onClick={props.onClick}>
                {props.icon}
            </FloatingActionButton>
        </Paper>
    );
}

FloatingButton.propTypes = {
    onClick : PropTypes.func,
    icon    : PropTypes.object
}

export default FloatingButton;