import React, { Component, PropTypes } from 'react';

import { FlatButton } from 'material-ui';
import { SocialPersonAdd, ActionInput } from 'material-ui/lib/svg-icons';

class HomeView extends Component {

    static propTypes = {
        isAuthenticated : PropTypes.bool,
        currentUser     : PropTypes.string
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

    handleSignupAction() {
        this.context.router.push(`/signup`);
    }

    render() {
        const { isAuthenticated, currentUser } = this.props;
        const content = isAuthenticated ?
                            ( `欢迎回来, ${currentUser}`) :
                            ( <div>
                                <FlatButton label="请登陆"
                                            onTouchTap={::this.handleLoginAction}
                                            linkButton={true}
                                            icon={<ActionInput />}
                                />

                                <FlatButton label="注册"
                                            onTouchTap={::this.handleSignupAction}
                                            linkButton={true}
                                            icon={<SocialPersonAdd />}
                                />
                              </div>
                            );
        return (
            <div>
                <h1>{content} </h1>
            </div>
        );
    }
}

export default HomeView;