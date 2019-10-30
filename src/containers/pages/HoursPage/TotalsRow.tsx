import * as classNames from 'classnames';
import * as React from 'react';

import { HOUR_LIMITS } from '../../../constants';
import { toHourFormat } from '../../../helpers';
import { Totals } from '../../../types';

import './TotalsRow.css';

interface TotalsRowProps {
    showLabels?: boolean;
    showNegativeAndPositiveSs?: boolean;
    showTotalSs?: boolean;
    totals: Totals;
}

export const TotalsRow: React.SFC<TotalsRowProps> = ({
    showLabels,
    showNegativeAndPositiveSs,
    showTotalSs = true,
    totals: { hours, negativeSs, positiveSs, ss }
}) => (
    <div className="totals-row">
        <div className="total-row">
            {showLabels && <div className="total-label">Hours</div>}

            <div className={classNames({ 'total-value': true, 'bad': hours > HOUR_LIMITS.maxHoursPerWeek })}>
                {toHourFormat(hours)}
            </div>
        </div>

        <div className="total-row">
            {showLabels && <div className="total-label">SS</div>}

            <div className="total-value">
                {showNegativeAndPositiveSs && (
                    <React.Fragment>
                        <span className="good">+{toHourFormat(positiveSs)}</span>
                        &nbsp;
                        <span className="bad">-{toHourFormat(Math.abs(negativeSs))}</span>
                        {showTotalSs && ' = '}
                    </React.Fragment>
                )}
                {showTotalSs && (
                    <span className={classNames({ 'bad': ss < 0, 'good': ss > 0 })}>
                        {toHourFormat(ss)}
                    </span>
                )}
            </div>
        </div>

        <div className="total-row total" style={{ flex: 1 }}>
            {showLabels && <div className="total-label">Total</div>}

            <div className="total-value">
                {toHourFormat(hours - negativeSs)}
            </div>
        </div>
    </div>
);
