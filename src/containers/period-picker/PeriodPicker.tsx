import * as React from 'react';

import './PeriodPicker.css';

interface OwnProps {
    value: number;
    onUpdate: (value: number) => () => void;
    tooltipIncrease?: string;
    tooltipDecrease?: string;
    disableIncrease?: boolean;
    disableDecrease?: boolean;
}

export const PeriodPicker: React.SFC<OwnProps> = ({
    value,
    onUpdate,
    tooltipIncrease,
    tooltipDecrease,
    disableIncrease,
    disableDecrease
}) => (
    <div className="period-picker">
        <span className="value">{value}</span>

        <div className="controls">
            <button
                title={tooltipIncrease}
                aria-label="Increase"
                onClick={onUpdate(value + 1)}
                disabled={disableIncrease}
            >
                <div className="control-icon-up"/>
            </button>

            <button
                title={tooltipDecrease}
                aria-label="Decrease"
                onClick={onUpdate(value - 1)}
                disabled={disableDecrease}
            >
                <div className="control-icon-down"/>
            </button>
        </div>
    </div>
);
