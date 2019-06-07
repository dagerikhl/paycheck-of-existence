import * as classNames from 'classnames';
import * as React from 'react';

import { HOUR_LIMITS } from '../../../constants';
import { toHourFormat } from '../../../helpers';
import { Totals } from '../../../types';

import './StatusSummary.css';

interface OwnProps {
    totals: Totals;
}

export const StatusSummary: React.SFC<OwnProps> = ({ totals: { hours, ss } }) => (
    <div className="status-summary">
        <div>
            <span>Hours: </span>
            <span
                className={classNames({
                    'no-break': true,
                    good: hours === HOUR_LIMITS.maxHoursPerWeek,
                    bad: hours !== HOUR_LIMITS.maxHoursPerWeek
                })}
            >
                {toHourFormat(hours)}
            </span>
        </div>

        <div>
            <span>SS: </span>
            <span className={classNames({ 'no-break': true, good: ss > 0, bad: ss < 0 })}>
                {toHourFormat(ss)}
            </span>
        </div>

        <div>
            <span>OT: </span>
            <span className={classNames({ 'no-break': true, bad: hours > HOUR_LIMITS.maxHoursPerWeek })}>
                {toHourFormat(hours - HOUR_LIMITS.maxHoursPerWeek)}
            </span>
        </div>

        <div className="total">
            <span>Total: </span>
            <span className="no-break">{toHourFormat(hours + ss)}</span>
        </div>
    </div>
);
