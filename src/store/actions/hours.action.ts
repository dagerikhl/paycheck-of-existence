import { Week } from '../../constants/interfaces/Week';
import { Weeks } from '../../constants/interfaces/Weeks';

export enum HoursActionType {
    UpdateAllWeeks = 'HOURS/UPDATE_ALL_WEEKS',
    UpdateWeek = 'HOURS/UPDATE_WEEK'
}

export type HoursAction =
    | UpdateAllWeeks
    | UpdateWeek;

export interface UpdateAllWeeks {
    type: HoursActionType.UpdateAllWeeks;
    weeks: Weeks;
}

export const updateAllWeeksAction = (weeks: Week[]): UpdateAllWeeks => ({
    type: HoursActionType.UpdateAllWeeks,
    weeks
});

export interface UpdateWeek {
    type: HoursActionType.UpdateWeek;
    weekNumber: number;
    week: Week;
}

export const updateWeekAction = (weekNumber: number, week: Week): UpdateWeek => ({
    type: HoursActionType.UpdateWeek,
    weekNumber,
    week
});
