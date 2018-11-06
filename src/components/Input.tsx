import * as React from 'react';

import { Theme } from '../constants';

import './Input.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    square?: boolean;
    round?: boolean;
}

type InputProps = OwnProps & React.HTMLProps<HTMLInputElement>;

class InputComponent extends React.PureComponent<InputProps> {
    public render() {
        const { className, theme, square, round, children, value, ...rest } = this.props;

        const classNames = `${className
            } input ${theme || Theme.NEUTRAL
            } ${square ? 'square' : ''
            } ${round ? 'round' : ''}`;

        return (
            <input
                className={classNames}
                value={value}
                onChange={this.onChange}
                // TODO Implement onBlur to ensure a correct input at all times
                // onBlur={this.onBlur}
                {...rest}
            >
                {children}
            </input>
        );
    }

    private onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, onChange } = this.props;

        if (!onChange) {
            return;
        }

        const newValue = event.currentTarget.value;
        if (newValue !== value && this.isValid(newValue)) {
            onChange(event);
        }
    };

    private isValid = (newValue: number | string) => {
        const { min, max, maxLength } = this.props;

        if (min && min < newValue) {
            return min;
        }

        if (max && max > newValue) {
            return max;
        }

        if (typeof newValue === 'string' && maxLength && maxLength > newValue.length) {
            return newValue.substr(0, maxLength);
        }

        return newValue;
    };
}

export const Input = InputComponent;
