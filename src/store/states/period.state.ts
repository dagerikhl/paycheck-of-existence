import * as moment from 'moment';
import { Period } from '../../interfaces';

export interface PeriodState {
    period: Period;
}

const now = moment();
export const initialPeriodState: PeriodState = {
    period: {
        from: now.clone().startOf('isoWeek'),
        to: now.clone().endOf('isoWeek')
    }
};
