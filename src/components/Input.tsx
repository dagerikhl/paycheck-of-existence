import * as React from 'react';

import { Theme } from '../constants';

import './Input.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    square?: boolean;
    round?: boolean;
    onClick?: () => void;
}

type InputProps = OwnProps & React.HTMLProps<HTMLInputElement>;

const InputComponent: React.SFC<InputProps> = ({ className, theme, square, round, children, ...rest }) => (
    <input
        className={`${className} input ${theme || Theme.NEUTRAL} ${square ? 'square' : ''} ${round ? 'round' : ''}`}
        {...rest}
    >
        {children}
    </input>
);

export const Input = InputComponent;
