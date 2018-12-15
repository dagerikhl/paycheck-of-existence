import * as classNames from 'classnames';
import * as React from 'react';

import { HOUR_LIMITS } from '../../../constants';
import { toHourFormat } from '../../../helpers';
import { Totals } from '../../../interfaces';

import './StatusSummary.css';

interface OwnProps {
    totals: Totals;
}

export const StatusSummary: React.SFC<OwnProps> = ({ totals: { hoursNo, ssNo, hoursO, ssO, ot } }) => (
    <div className="status-summary">
        <div>
            <span>Hours: </span>
            <span
                className={classNames({
                    'no-break': true,
                    good: hoursNo + hoursO === HOUR_LIMITS.maxHoursPerWeek,
                    bad: hoursNo + hoursO !== HOUR_LIMITS.maxHoursPerWeek
                })}
            >
                {toHourFormat(hoursNo + hoursO)}
            </span>
        </div>

        <div>
            <span>SS: </span>
            <span className={classNames({ 'no-break': true, good: ssNo + ssO > 0, bad: ssNo + ssO < 0 })}>
                {toHourFormat(ssNo + ssO)}
            </span>
        </div>

        <div>
            <span>OT: </span>
            <span className={classNames({ 'no-break': true, bad: ot > 0 })}>{toHourFormat(ot)}</span>
        </div>

        <div className="total">
            <span>Total: </span>
            <span className="no-break">{toHourFormat(hoursNo + hoursO + ssNo + ssO + ot)}</span>
        </div>
    </div>
);
