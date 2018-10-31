import { Weeks } from '../../constants';

export interface HoursState {
    weeks: Weeks;
}

export const initialHoursState: HoursState = {
    weeks: {}
};
