import { Action, ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';

import { State } from '../store/states';
import { store } from '../store/store';

/**
 * Helper function to write simple mapper function for components. Only works for synchronous actions. If dispatching
 * asynchronous actions that uses redux-thunk, this helper can not be used.
 *
 * @param {T} actions The actions to be dispatched.
 * @returns {(dispatch: Dispatch) => T} A mapped object of all the actions to be dispatched.
 */
export const mapSynchronousDispatchProps = <A extends Action, T extends ActionCreatorsMapObject<A>>(actions: T) => {
    return (dispatch: Dispatch) => bindActionCreators(actions, dispatch);
};

export const getState = (): State => {
    return store.getState();
};
