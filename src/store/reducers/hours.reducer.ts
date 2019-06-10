import { HoursAction, HoursActionType } from '../actions';
import { HoursState, initialHoursState } from '../states';

export const hoursReducer = (state: HoursState = initialHoursState, action: HoursAction): HoursState => {
    switch (action.type) {
        case HoursActionType.GetWorkdays:
        case HoursActionType.GetWorkdaysInPeriod:
            return {
                ...state,
                isFetching: true
            };
        case HoursActionType.GetWorkdaysSuccess:
        case HoursActionType.GetWorkdaysInPeriodSuccess:
            return {
                ...state,
                workdays: action.workdays,
                isFetching: false
            };
        case HoursActionType.GetWorkdaysFailure:
        case HoursActionType.GetWorkdaysInPeriodFailure:
            return {
                ...state,
                error: action.error,
                isFetching: false
            };

        case HoursActionType.UpdateWorkdays:
            return {
                ...state,
                isStoring: true
            };
        case HoursActionType.UpdateWorkdaysSuccess:
            return {
                ...state,
                workdays: action.workdays,
                isStoring: false
            };
        case HoursActionType.UpdateWorkdaysFailure:
            return {
                ...state,
                error: action.error,
                isStoring: false
            };

        default:
            return state;
    }
};
