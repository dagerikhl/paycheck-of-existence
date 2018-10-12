import { combineReducers } from 'redux';

import { State } from '../states/state';
import { authReducer } from './auth.reducer';
import { dummyReducer } from './dummy.reducer';

export const reducer = combineReducers<State>({
    auth: authReducer,
    dummy: dummyReducer
});
