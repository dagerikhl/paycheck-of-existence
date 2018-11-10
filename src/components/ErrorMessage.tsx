import * as React from 'react';

import './ErrorMessage.css';

interface OwnProps {
    message: string;
}

const ErrorMessageComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="error-message">
        {props.message}
    </div>
);

export const ErrorMessage = ErrorMessageComponent;
