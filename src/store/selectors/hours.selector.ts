import { createSelector } from 'reselect';

import { filterDaysByPeriod } from '../../helpers';
import { State } from '../states';
import { getPeriod } from './period.selector';

// Selectors

const getDays = (state: State) => state.hours.days;

const getInitialDays = (state: State) => state.hours.initialDays;

// Reselectors

export const getDaysInWeek = createSelector([getPeriod, getDays], (period, days) => filterDaysByPeriod(days, period));

export const getInitialDaysInWeek = createSelector([getPeriod, getInitialDays], (period, initialDays) => {
    return filterDaysByPeriod(initialDays, period);
});
