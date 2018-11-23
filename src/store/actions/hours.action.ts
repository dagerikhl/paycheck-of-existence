import { Map } from 'immutable';

import { Day } from '../../interfaces';

export enum HoursActionType {
    UpdateAllDays = 'HOURS/UPDATE_ALL_DAYS',
    UpdateInitialDays = 'HOURS/UPDATE_INITIAL_DAYS',
    UpdateWeek = 'HOURS/UPDATE_WEEK',
    UpdateDay = 'HOURS/UPDATE_DAY'
}

export type HoursAction =
    | UpdateAllDays
    | UpdateInitialDays
    | UpdateWeek
    | UpdateDay;

export interface UpdateAllDays {
    type: HoursActionType.UpdateAllDays;
    days: Map<string, Day>;
}

export const updateAllDaysAction = (days: Map<string, Day>): UpdateAllDays => ({
    type: HoursActionType.UpdateAllDays,
    days
});

export interface UpdateInitialDays {
    type: HoursActionType.UpdateInitialDays;
    days: Map<string, Day>;
}

export const updateInitialDaysAction = (days: Map<string, Day>): UpdateInitialDays => ({
    type: HoursActionType.UpdateInitialDays,
    days
});

export interface UpdateWeek {
    type: HoursActionType.UpdateWeek;
    week: Map<string, Day>;
}

export const updateWeekAction = (week: Map<string, Day>): UpdateWeek => ({
    type: HoursActionType.UpdateWeek,
    week
});

export interface UpdateDay {
    type: HoursActionType.UpdateDay;
    dateString: string;
    day: Day;
}

export const updateDayAction = (dateString: string, day: Day): UpdateDay => ({
    type: HoursActionType.UpdateDay,
    dateString,
    day
});
