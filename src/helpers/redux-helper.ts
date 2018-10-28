import { Action, ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';

export const createDispatchToPropsFunction = <A extends Action, T extends ActionCreatorsMapObject<A>>
(dispatchFunctions: T) => {
    return (dispatch: Dispatch) => bindActionCreators(dispatchFunctions, dispatch);
};
