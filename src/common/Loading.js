import React, { Component } from 'react';

import CircularProgress from 'material-ui/lib/circular-progress';

const Loading = () => (
    <div style={{ textAlign: 'center', paddingTop: 50 }}>
        <CircularProgress indeterminate />
    </div>
);

export default Loading;