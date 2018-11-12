import { Map } from 'immutable';
import * as moment from 'moment';

import { DATE_STORAGE, Day, Period } from '../constants';

export const getNewestWeekNumberInYear = (year: number) => {
    const now = moment();

    return year === now.year()
        ? now.isoWeek()
        : now.year(year).isoWeeksInYear();
};

export const getPeriodForWeek = (year: number, weekNumber: number): Period => {
    const from = moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
    const to = from.clone().endOf('isoWeek');

    return { from, to };
};

export const filterDaysByPeriod = (days: Map<string, Day>, period: Period) => days.filter((_, dateString) => {
    const date = moment(dateString, DATE_STORAGE);

    return date.isBetween(period.from, period.to, undefined, '[]');
});
