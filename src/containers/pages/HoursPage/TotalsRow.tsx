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
        <div className="total-hours">
            {showLabels && <div className="total-label">Hours</div>}

            <div className={classNames({ 'total-value': true, 'bad': hours > HOUR_LIMITS.maxHoursPerWeek })}>
                {toHourFormat(hours)}
            </div>
        </div>

        <div className="total-ss">
            {showLabels && <div className="total-label">SS</div>}

            <div className="total-value">
                {toHourFormat(ss)}
            </div>
        </div>
    </div>
);
