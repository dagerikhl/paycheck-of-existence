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

export const filterDaysByPeriod = (days: Map<string, Day>, period: Period) => days.filter((_, dateString) => {
    const date = moment(dateString, DATE_FORMATS.storage);

    return date.isBetween(period.from, period.to, undefined, '[]');
});
