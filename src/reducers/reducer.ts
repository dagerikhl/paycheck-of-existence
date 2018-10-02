import { combineReducers } from 'redux';

import { State } from '../states/state';
import { dummyReducer } from './dummy.reducer';

export const reducer = combineReducers<State>({
    dummy: dummyReducer
});
