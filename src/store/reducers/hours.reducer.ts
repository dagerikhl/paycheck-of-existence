import { HoursAction, HoursActionType } from '../actions';
import { HoursState, initialHoursState } from '../states';

export const hoursReducer = (state: HoursState = initialHoursState, action: HoursAction): HoursState => {
    switch (action.type) {
        case HoursActionType.UpdateAllWeeks:
            return {
                ...state,
                weeks: action.weeks
            };
        case HoursActionType.UpdateInitialWeeks:
            return {
                ...state,
                initialWeeks: action.weeks
            };
        case HoursActionType.UpdateWeek:
            return {
                ...state,
                weeks: {
                    ...state.weeks,
                    [action.weekNumber]: action.week
                }
            };
        default:
            return state;
    }
};
