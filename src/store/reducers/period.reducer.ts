import { PeriodAction, PeriodActionType } from '../actions';
import { initialPeriodState, PeriodState } from '../states';

export const periodReducer = (state: PeriodState = initialPeriodState, action: PeriodAction): PeriodState => {
    switch (action.type) {
        case PeriodActionType.UpdatePeriod:
            return {
                ...state,
                period: action.period
            };
        default:
            return state;
    }
};
