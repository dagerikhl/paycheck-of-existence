import * as classNames from 'classnames';
import * as React from 'react';

import { Theme } from '../constants';

import './Button.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    square?: boolean;
    round?: boolean;
    onClick?: () => void;
}

type ButtonProps = OwnProps & React.HTMLProps<HTMLButtonElement>;

export const Button: React.SFC<ButtonProps> = ({ className, theme, square, round, children, ...rest }) => (
    <button
        className={classNames({
            [className as string]: className,
            'button': true,
            [theme || Theme.NEUTRAL]: true,
            'square': square,
            'round': round
        })}
        type="button"
        {...rest}
    >
        {children}
    </button>
);
