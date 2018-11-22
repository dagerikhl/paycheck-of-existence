import * as React from 'react';

import './ErrorMessage.css';

interface OwnProps {
    message: string;
}

export const ErrorMessage: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="error-message">
        {props.message}
    </div>
);
