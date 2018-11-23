import { Action, ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';

export const mapDispatchProps = <A extends Action, T extends ActionCreatorsMapObject<A>>(dispatchFunctions: T) => {
    return (dispatch: Dispatch) => bindActionCreators(dispatchFunctions, dispatch);
};
