import { Map } from 'immutable';
import * as moment from 'moment';

import { DATE_FORMATS } from '../constants';
import { Day, Period } from '../interfaces';

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

export const getFirstDayOfWeek = (year: number, weekNumber: number) => {
    return moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
};

export const filterDaysByPeriod = (days: Map<string, Day>, period: Period) => days.filter((_, dateString) => {
    const date = moment(dateString, DATE_FORMATS.storage);

    return date.isBetween(period.from, period.to, undefined, '[]');
});
