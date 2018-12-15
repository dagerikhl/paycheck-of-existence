export enum PeriodActionType {
    UpdateWeekNumber = 'PERIOD/UPDATE_WEEK_NUMBER',
    UpdateYear = 'PERIOD/UPDATE_YEAR'
}

export type PeriodAction =
    | UpdatePeriodWeekNumber
    | UpdatePeriodYear;

export interface UpdatePeriodWeekNumber {
    type: PeriodActionType.UpdateWeekNumber;
    weekNumber: number;
}

export const updatePeriodWeekNumberAction = (weekNumber: number): UpdatePeriodWeekNumber => ({
    type: PeriodActionType.UpdateWeekNumber,
    weekNumber
});

export interface UpdatePeriodYear {
    type: PeriodActionType.UpdateYear;
    year: number;
}

export const updatePeriodYearAction = (year: number): UpdatePeriodYear => ({
    type: PeriodActionType.UpdateYear,
    year
});
