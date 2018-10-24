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

const ButtonComponent: React.SFC<OwnProps> = ({ className, theme, square, round, onClick, children }) => (
    <button
        className={`${className} g-button ${theme} ${square ? 'square' : ''} ${round ? 'round' : ''}`}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);

export const Button = ButtonComponent;
