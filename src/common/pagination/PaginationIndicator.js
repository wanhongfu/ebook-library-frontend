import React, {PropTypes} from 'react';
import {FlatButton} from 'material-ui';
import { Colors } from 'material-ui/lib/styles';

export default class PaginationIndicator extends React.Component {

    static propTypes = {
        active      : PropTypes.bool,
        disabled    : PropTypes.bool,
        label       : PropTypes.string,
        onClick     : PropTypes.func,
        pageNum     : PropTypes.number,
        icon        : PropTypes.object
    }

    static defaultProps = {
        active      : false,
        disabled    : false,
        label       : '',
        onClick     : null,
        icon        : null
    }

    handleClick = () => {
        const {pageNum, onClick} = this.props;
        if(onClick) onClick(pageNum);
    }

    render() {

        const { disabled, label, active, icon } = this.props;

        const styles = {
            fb: {
                minWidth: `25px`,
                backgroundColor: active ? Colors.grey100 : Colors.white
            }
        }

        const otherProps = icon ? {icon: icon} : {label: String(label)};

        return (
            <FlatButton disabled={ active || disabled }
                        onClick={this.handleClick} style={styles.fb}
                        {...otherProps}
            />
        );
    }

}