import * as React from 'react';

import './Loader.css';

interface OwnProps {
    text?: string;
}

const LoaderComponent: React.SFC<OwnProps> = ({ text }: OwnProps) => (
    <div className="loader">
        <div className="spinner"/>
        {text && <h3 className="text">{text}</h3>}
    </div>
);

export const Loader = LoaderComponent;
