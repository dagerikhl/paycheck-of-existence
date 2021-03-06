import * as classNames from 'classnames';
import * as React from 'react';

import { Theme } from '../enums';

import './Button.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    square?: boolean;
    round?: boolean;
    onClick?: () => void;
}

type ButtonProps = OwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
        aria-label="Button"
        {...rest}
    >
        {children}
    </button>
);
