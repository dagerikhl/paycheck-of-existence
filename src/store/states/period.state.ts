import * as moment from 'moment';

export interface PeriodState {
    year: number;
}

export const initialPeriodState: PeriodState = {
    year: moment().year()
};
