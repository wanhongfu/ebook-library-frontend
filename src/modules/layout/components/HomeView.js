import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import InputIcon from 'material-ui/lib/svg-icons/action/input';

class HomeView extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        currentUser: PropTypes.string
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
    }

    handleLoginAction() {
        this.context.router.push(`/login`);
    }

    render() {
        const { isAuthenticated, currentUser } = this.props;
        const content = isAuthenticated ?
                            ( `欢迎回来, ${currentUser}`) :
                            ( <FlatButton label="请登陆" onTouchTap={::this.handleLoginAction}
                                          linkButton={true} icon={<InputIcon />} /> );
        return (
            <div>
                <h1>{content} </h1>
            </div>
        );
    }
}

export default HomeView;