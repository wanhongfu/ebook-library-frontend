import React from 'react';

import FineContentDiv from './FineContentDiv'
import InnerToolbar from './toolbar/InnerToolbar';

export default class PageNotFound extends React.Component {
    render() {
        return (
            <div>
                <InnerToolbar title="We are sorry!" />
                <FineContentDiv>
                    <h1>Page Not Found</h1>
                </FineContentDiv>
            </div>

        );
    }
}
