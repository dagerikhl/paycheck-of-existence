import { ControlsAction, ControlsActionType } from '../actions';
import { ControlsState, initialControlsState } from '../states';

export const controlsReducer = (state: ControlsState = initialControlsState, action: ControlsAction): ControlsState => {
    switch (action.type) {
        case ControlsActionType.UpdatePeriod:
            return {
                ...state,
                period: action.period
            };
        default:
            return state;
    }
};
