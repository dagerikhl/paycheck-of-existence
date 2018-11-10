import { Weeks } from '../../constants';

export interface HoursState {
    initialWeeks: Weeks;
    weeks: Weeks;
}

export const initialHoursState: HoursState = {
    initialWeeks: {},
    weeks: {}
};
