import { List } from 'immutable';

import { Workdays } from '../../types';

export interface HoursState {
    workdays: Workdays;
    error?: Error;
    isFetching?: boolean;
    isStoring?: boolean;
}

export const initialHoursState: HoursState = {
    workdays: List()
};
