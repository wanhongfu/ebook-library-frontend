import React from 'react';
import ReactDom from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import RootApp from './modules/common/layout';

const app = (
    <RootApp />
);

injectTapEventPlugin();
ReactDom.render(app, document.getElementById('app'));