import { filterDaysByPeriod, getPeriodForWeek } from '../../helpers';
import { State } from '../states';

export const getDaysInWeek = (state: State, weekNumber: number) => {
    const period = getPeriodForWeek(state.period.year, weekNumber);

    return filterDaysByPeriod(state.hours.days, period);
};

export const getInitialDaysInWeek = (state: State, weekNumber: number) => {
    const period = getPeriodForWeek(state.period.year, weekNumber);

    return filterDaysByPeriod(state.hours.initialDays, period);
};
