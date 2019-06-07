import * as moment from 'moment';

import { Period, Workdays } from '../types';

export const getNewestWeekNumberInYear = (year: number) => {
    const now = moment();

    return year === now.year()
        ? now.isoWeek()
        : now.year(year).isoWeeksInYear();
};

export const filterWorkdaysByPeriod = (workdays: Workdays, period: Period) => workdays.filter((workday) => {
    return workday.get('date').isBetween(period.from, period.to, 'date', '[]');
});
