import * as React from 'react';

import './Loader.css';

interface OwnProps {
    text?: string;
}

export const Loader: React.SFC<OwnProps> = ({ text }: OwnProps) => (
    <div className="loader">
        <div className="spinner"/>
        {text && <h3 className="text">{text}</h3>}
    </div>
);
