import * as React from 'react';

import { InputCellType, Theme } from '../constants';
import { roundTo } from '../helpers';

import './Input.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    square?: boolean;
    round?: boolean;
    type: InputCellType;
    value?: number | string;
    onValueChange?: (value: number | string) => void;
    placeholder?: string;
    step?: number;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}

class InputComponent extends React.PureComponent<OwnProps> {
    public render() {
        const { className, theme, square, round, type, value, placeholder, step, children } = this.props;

        const classNames = `${className
            } input ${theme || Theme.NEUTRAL
            } ${square ? 'square' : ''
            } ${round ? 'round' : ''}`;

        return (
            <input
                className={classNames}
                type={type}
                value={value}
                onChange={this.onChange}
                placeholder={placeholder}
                step={step}
            >
                {children}
            </input>
        );
    }

    private onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { onValueChange } = this.props;

        if (!onValueChange) {
            return;
        }

        const newValue = event.currentTarget.value;

        const validValue = this.enforceValidValue(newValue);

        onValueChange(validValue);
    };

    private enforceValidValue = (value: number | string): number | string => {
        const { type, step, min, max, minLength, maxLength } = this.props;

        let validValue = value;
        switch (type) {
            case InputCellType.NUMBER:
                validValue = +value;

                if (step !== undefined) {
                    validValue = roundTo(validValue, step);
                }

                if (min !== undefined && min > validValue) {
                    validValue = min;
                }

                if (max !== undefined && max < validValue) {
                    validValue = max;
                }

                break;
            case InputCellType.EMAIL:
            case InputCellType.PASSWORD:
            case InputCellType.TEXT:
                validValue = value as string;

                if (minLength !== undefined && minLength < validValue.length) {
                    validValue = validValue.padStart(minLength - validValue.length, '-');
                }

                if (maxLength !== undefined && maxLength > validValue.length) {
                    validValue = validValue.substr(0, maxLength);
                }

                break;
        }

        return validValue;
    };
}

export const Input = InputComponent;
