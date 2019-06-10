import * as classNames from 'classnames';
import * as React from 'react';

import { HOUR_LIMITS } from '../../../constants';
import { toHourFormat } from '../../../helpers';
import { Totals } from '../../../types';

import './TotalsRow.css';

interface TotalsRowProps {
    totals: Totals;
}

export const TotalsRow: React.SFC<TotalsRowProps> = ({ totals: { hours, ss } }) => (
    <div className="totals-row">
        <div className="total-header"/>

        <div className="total-hours">
            <div className="total-label">Hours</div>

            <div className={classNames({ 'bad': hours > HOUR_LIMITS.maxHoursPerWeek })}>
                {toHourFormat(hours)}
            </div>
        </div>

        <div className="total-ss">
            <div className="total-label">SS</div>

            <div>
                {toHourFormat(ss)}
            </div>
        </div>
    </div>
);
