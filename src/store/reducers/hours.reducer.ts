import { HoursAction, HoursActionType } from '../actions';
import { HoursState, initialHoursState } from '../states';

export const hoursReducer = (state: HoursState = initialHoursState, action: HoursAction): HoursState => {
    switch (action.type) {
        case HoursActionType.UpdateWorkdays:
            return {
                ...state,
                workdays: action.workdays
            };
        default:
            return state;
    }
};
