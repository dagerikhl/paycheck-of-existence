import { HoursAction, HoursActionType } from '../actions';
import { HoursState, initialHoursState } from '../states';

export const hoursReducer = (state: HoursState = initialHoursState, action: HoursAction): HoursState => {
    switch (action.type) {
        case HoursActionType.UpdateAllDays:
            return {
                ...state,
                days: action.days
            };
        case HoursActionType.UpdateInitialDays:
            return {
                ...state,
                initialDays: action.days
            };
        case HoursActionType.UpdateWeek:
            return {
                ...state,
                days: state.days.merge(action.week)
            };
        case HoursActionType.UpdateDay:
            return {
                ...state,
                days: state.days.set(action.dateString, action.day)
            };
        default:
            return state;
    }
};
