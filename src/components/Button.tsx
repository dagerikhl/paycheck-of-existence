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

const ButtonComponent: React.SFC<ButtonProps> = ({ className, theme, square, round, children, ...rest }) => (
    <button
        className={`${className} button ${theme || Theme.NEUTRAL} ${square ? 'square' : ''} ${round ? 'round' : ''}`}
        type="button"
        {...rest}
    >
        {children}
    </button>
);

export const Button = ButtonComponent;
