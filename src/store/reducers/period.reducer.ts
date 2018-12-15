import { getNewestWeekNumberInYear } from '../../helpers';
import { PeriodAction, PeriodActionType } from '../actions';
import { initialPeriodState, PeriodState } from '../states';

export const periodReducer = (state: PeriodState = initialPeriodState, action: PeriodAction): PeriodState => {
    switch (action.type) {
        case PeriodActionType.UpdateWeekNumber:
            return {
                ...state,
                weekNumber: action.weekNumber
            };
        case PeriodActionType.UpdateYear:
            return {
                ...state,
                year: action.year,
                weekNumber: getNewestWeekNumberInYear(action.year)
            };
        default:
            return state;
    }
};
