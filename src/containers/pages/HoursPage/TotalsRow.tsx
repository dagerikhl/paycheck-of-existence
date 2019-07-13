import * as classNames from 'classnames';
import * as React from 'react';

import { HOUR_LIMITS } from '../../../constants';
import { toHourFormat } from '../../../helpers';
import { Totals } from '../../../types';

import './TotalsRow.css';

interface TotalsRowProps {
    showLabels?: boolean;
    totals: Totals;
}

export const TotalsRow: React.SFC<TotalsRowProps> = ({ showLabels, totals: { hours, ss } }) => (
    <div className="totals-row">
        <div className="total-row">
            {showLabels && <div className="total-label">Hours</div>}

            <div className={classNames({ 'total-value': true, 'bad': hours > HOUR_LIMITS.maxHoursPerWeek })}>
                {toHourFormat(hours)}
            </div>
        </div>

        <div className="total-row">
            {showLabels && <div className="total-label">SS</div>}

            <div className={classNames({ 'total-value': true, 'bad': ss < 0, 'good': ss > 0 })}>
                {toHourFormat(ss)}
            </div>
        </div>

        <div className="total-row total" style={{ flex: 1 }}>
            {showLabels && <div className="total-label">Total</div>}

            <div className="total-value">
                {toHourFormat(hours - Math.min(ss, 0))}
            </div>
        </div>
    </div>
);
