import * as React from 'react';

import './Loader.css';

const LoaderComponent: React.SFC = () => (
    <div className="loader">
        <div className="spinner"/>
    </div>
);

export const Loader = LoaderComponent;
