import * as React from 'react';

import './ErrorMessage.css';

interface OwnProps {
    message: string;
}

const ErrorMessageComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="container">
        <div className="content">
            {props.message}
        </div>
    </div>
);

export const ErrorMessage = ErrorMessageComponent;
