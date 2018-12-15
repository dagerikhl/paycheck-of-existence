import * as React from 'react';

import './PeriodPicker.css';

interface OwnProps {
    value: number;
    onUpdate: (value: number) => () => void;
    disableIncrease?: boolean;
    disableDecrease?: boolean;
}

export const PeriodPicker: React.SFC<OwnProps> = ({ value, onUpdate, disableIncrease, disableDecrease }) => (
    <div className="period-picker">
        <span className="value">{value}</span>

        <div className="controls">
            <button
                aria-label="Increase"
                onClick={onUpdate(value + 1)}
                disabled={disableIncrease}
            >
                <div className="control-icon-up"/>
            </button>

            <button
                aria-label="Decrease"
                onClick={onUpdate(value - 1)}
                disabled={disableDecrease}
            >
                <div className="control-icon-down"/>
            </button>
        </div>
    </div>
);
