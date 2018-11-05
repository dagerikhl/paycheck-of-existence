import { Day, Weeks } from '../../constants';

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

export const updateAllWeeksAction = (weeks: Weeks): UpdateAllWeeks => ({
    type: HoursActionType.UpdateAllWeeks,
    weeks
});

export interface UpdateWeek {
    type: HoursActionType.UpdateWeek;
    weekNumber: number;
    week: Day[];
}

export const updateWeekAction = (weekNumber: number, week: Day[]): UpdateWeek => ({
    type: HoursActionType.UpdateWeek,
    weekNumber,
    week
});
