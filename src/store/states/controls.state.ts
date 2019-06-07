import * as moment from 'moment';

import { Period } from '../../types';

export interface ControlsState {
    period: Period;
}

const now = moment();
export const initialControlsState: ControlsState = {
    period: {
        from: now.clone().startOf('isoWeek'),
        to: now.clone().endOf('isoWeek')
    }
};
