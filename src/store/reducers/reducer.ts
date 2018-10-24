import { combineReducers } from 'redux';

import { State } from '../states/state';
import { authReducer } from './auth.reducer';
import { periodReducer } from './period.reducer';

export const reducer = combineReducers<State>({
    auth: authReducer,
    period: periodReducer
});
