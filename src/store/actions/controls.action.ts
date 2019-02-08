import { Period } from '../../interfaces';

export enum ControlsActionType {
    UpdatePeriod = 'PERIOD/UPDATE_PERIOD'
}

export type ControlsAction =
    | UpdatePeriod;

export interface UpdatePeriod {
    type: ControlsActionType.UpdatePeriod;
    period: Period;
}

export const updatePeriodAction = (period: Period): UpdatePeriod => ({
    type: ControlsActionType.UpdatePeriod,
    period
});
