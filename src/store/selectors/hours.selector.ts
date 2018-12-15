import createCachedSelector from 're-reselect';

import { filterDaysByPeriod, getPeriodForWeek } from '../../helpers';
import { State } from '../states';
import { getYear } from './period.selector';

// Prop selectors

const getWeekNumber = (state: State, props: any) => props.weekNumber;

// Selectors

const getDays = (state: State) => state.hours.days;

const getInitialDays = (state: State) => state.hours.initialDays;

// Reselectors

export const getDaysInWeek = createCachedSelector([getYear, getDays, getWeekNumber], (year, days, weekNumber) => {
    const period = getPeriodForWeek(year, weekNumber);

    return filterDaysByPeriod(days, period);
})((state, props) => props.weekNumber);

export const getInitialDaysInWeek = createCachedSelector(
    [getYear, getInitialDays, getWeekNumber],
    (year, initialDays, weekNumber) => {
        const period = getPeriodForWeek(year, weekNumber);

        return filterDaysByPeriod(initialDays, period);
    }
)((state, props) => props.weekNumber);
