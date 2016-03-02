import React from 'react';
import ReactDom from 'react-dom';


import injectTapEventPlugin from 'react-tap-event-plugin';

import AppRouter from './routes';

injectTapEventPlugin();

ReactDom.render(AppRouter, document.getElementById('app'));