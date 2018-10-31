import { Weeks } from '../../constants/interfaces/Weeks';

export interface HoursState {
    weeks: Weeks;
}

export const initialHoursState: HoursState = {
    weeks: {}
};
