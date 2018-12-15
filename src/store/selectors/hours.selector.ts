import { createSelector } from 'reselect';

import { filterDaysByPeriod, getPeriodForWeek } from '../../helpers';
import { State } from '../states';
import { getWeekNumber, getYear } from './period.selector';

// Selectors

const getDays = (state: State) => state.hours.days;

const getInitialDays = (state: State) => state.hours.initialDays;

// Reselectors

export const getDaysInWeek = createSelector([getYear, getWeekNumber, getDays], (year, weekNumber, days) => {
    const period = getPeriodForWeek(year, weekNumber);

    return filterDaysByPeriod(days, period);
});

export const getInitialDaysInWeek = createSelector(
    [getYear, getWeekNumber, getInitialDays],
    (year, weekNumber, initialDays) => {
        const period = getPeriodForWeek(year, weekNumber);

        return filterDaysByPeriod(initialDays, period);
    }
);
