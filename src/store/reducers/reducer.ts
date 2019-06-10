import { combineReducers } from 'redux';

import { State } from '../states';
import { authReducer } from './auth.reducer';
import { controlsReducer } from './controls.reducer';
import { hoursReducer } from './hours.reducer';
import { projectsReducer } from './projects.reducer';

export const reducer = combineReducers<State>({
    auth: authReducer,
    controls: controlsReducer,
    hours: hoursReducer,
    projects: projectsReducer
});
