import { Workdays } from '../../types';

export enum HoursActionType {
    UpdateWorkdays = 'HOURS/UPDATE_WORKDAYS'
}

export type HoursAction =
    | UpdateWorkdays;

export interface UpdateWorkdays {
    type: HoursActionType.UpdateWorkdays;
    workdays: Workdays;
}

export const updateWorkdaysAction = (workdays: Workdays): UpdateWorkdays => ({
    type: HoursActionType.UpdateWorkdays,
    workdays
});
