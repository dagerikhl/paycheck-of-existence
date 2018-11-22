import * as classNames from 'classnames';
import * as React from 'react';

import './Card.css';

interface OwnProps {
    className?: string;
    level?: number;
    onClick?: () => void;
}

export class Card extends React.PureComponent<OwnProps> {
    public render() {
        const { className, level, onClick, children } = this.props;

        if (level && (level < 0 || level > 5)) {
            return null;
        }

        return <div className={classNames({
            [className as string]: className,
            [`card-${level || 1}`]: true,
            'clickable': onClick
        })}
        >
            {children}
        </div>;
    }
}
