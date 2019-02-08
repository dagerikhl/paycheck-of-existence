import { Period } from '../../interfaces';

export enum PeriodActionType {
    UpdatePeriod = 'PERIOD/UPDATE_PERIOD'
}

export type PeriodAction =
    | UpdatePeriod;

export interface UpdatePeriod {
    type: PeriodActionType.UpdatePeriod;
    period: Period;
}

export const updatePeriodAction = (period: Period): UpdatePeriod => ({
    type: PeriodActionType.UpdatePeriod,
    period
});
