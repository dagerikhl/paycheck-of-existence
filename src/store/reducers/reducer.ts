import { combineReducers } from 'redux';

import { State } from '../states';
import { authReducer } from './auth.reducer';
import { hoursReducer } from './hours.reducer';
import { periodReducer } from './period.reducer';

export const reducer = combineReducers<State>({
    auth: authReducer,
    period: periodReducer,
    hours: hoursReducer
});
