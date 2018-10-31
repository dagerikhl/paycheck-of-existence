import { PeriodAction, PeriodActionType } from '../actions/period.action';
import { initialPeriodState, PeriodState } from '../states/period.state';

export const periodReducer = (state: PeriodState = initialPeriodState, action: PeriodAction): PeriodState => {
    switch (action.type) {
        case PeriodActionType.UpdateYear:
            return {
                ...state,
                year: action.year
            };
        default:
            return state;
    }
};
