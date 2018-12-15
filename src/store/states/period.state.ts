import * as moment from 'moment';

export interface PeriodState {
    year: number;
    weekNumber: number;
}

const now = moment();
export const initialPeriodState: PeriodState = {
    year: now.year(),
    weekNumber: now.isoWeek()
};
