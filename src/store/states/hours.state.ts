import { Map } from 'immutable';

import { Day } from '../../constants';

export interface HoursState {
    days: Map<string, Day>;
    initialDays: Map<string, Day>;
}

export const initialHoursState: HoursState = {
    days: Map<string, Day>(),
    initialDays: Map<string, Day>()
};
