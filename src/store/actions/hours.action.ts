import { Week, Weeks } from '../../constants';

export enum HoursActionType {
    UpdateAllWeeks = 'HOURS/UPDATE_ALL_WEEKS',
    UpdateInitialWeeks = 'HOURS/UPDATE_INITIAL_WEEKS',
    UpdateWeek = 'HOURS/UPDATE_WEEK'
}

export type HoursAction =
    | UpdateAllWeeks
    | UpdateInitialWeeks
    | UpdateWeek;

export interface UpdateAllWeeks {
    type: HoursActionType.UpdateAllWeeks;
    weeks: Weeks;
}

export const updateAllWeeksAction = (weeks: Weeks): UpdateAllWeeks => ({
    type: HoursActionType.UpdateAllWeeks,
    weeks
});

export interface UpdateInitialWeeks {
    type: HoursActionType.UpdateInitialWeeks;
    weeks: Weeks;
}

export const updateInitialWeeksAction = (weeks: Weeks): UpdateInitialWeeks => ({
    type: HoursActionType.UpdateInitialWeeks,
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
