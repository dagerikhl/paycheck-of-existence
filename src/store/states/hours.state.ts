import { List } from 'immutable';

import { Workdays } from '../../types';

export interface HoursState {
    workdays: Workdays;
}

export const initialHoursState: HoursState = {
    workdays: List()
};
