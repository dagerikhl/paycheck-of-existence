import { combineReducers } from 'redux';

import { State } from '../states/state.root';
import { dummyReducer } from './reducer.dummy';

export const rootReducer = combineReducers<State>({
    dummy: dummyReducer
});
