export enum PeriodActionType {
    UpdateYear = 'PERIOD/UPDATE_YEAR'
}

export type PeriodAction =
    | UpdatePeriodYear;

export interface UpdatePeriodYear {
    type: PeriodActionType.UpdateYear;
    year: number;
}

export const updatePeriodYearAction = (year: number): UpdatePeriodYear => ({
    type: PeriodActionType.UpdateYear,
    year
});
