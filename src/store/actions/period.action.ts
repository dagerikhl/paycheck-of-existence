export interface UpdatePeriodYear {
    type: string;
    year: number;
}

export type PeriodAction =
    | UpdatePeriodYear;

export const updatePeriodYear = (year: number): UpdatePeriodYear => ({
    type: 'UPDATE_PERIOD_YEAR',
    year
});
