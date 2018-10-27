import * as React from 'react';

import { Theme } from '../constants/enums/Theme';

import './Button.css';

interface OwnProps {
    className?: string;
    theme: Theme;
    square?: boolean;
    round?: boolean;
    onClick?: () => void;
}

type ButtonProps = OwnProps & React.HTMLProps<HTMLButtonElement>;

const ButtonComponent: React.SFC<ButtonProps> = ({ className, theme, square, round, onClick, children, ...rest }) => (
    <button
        className={`${className} button ${theme} ${square ? 'square' : ''} ${round ? 'round' : ''}`}
        type="button"
        onClick={onClick}
        {...rest}
    >
        {children}
    </button>
);

export const Button = ButtonComponent;
