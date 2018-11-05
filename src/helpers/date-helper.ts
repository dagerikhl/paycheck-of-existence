import * as moment from 'moment';

export const getNewestWeekNumberInYear = (year: number) => {
    const now = moment();

    return year === now.year()
        ? now.isoWeek()
        : now.year(year).isoWeeksInYear();
};

export const getCurrentWeekdayDate = (year: number, weekNumber: number, dayIndex: number) => {
    return moment().year(year).isoWeek(weekNumber).isoWeekday(dayIndex + 1);
};
