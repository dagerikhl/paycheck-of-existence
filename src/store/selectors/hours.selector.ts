import { createSelector } from 'reselect';

import { filterWorkdaysByPeriod } from '../../helpers';
import { State } from '../states';
import { getPeriod } from './controls.selector';

// Selectors

const getWorkdays = (state: State) => state.hours.workdays;

// Reselectors

export const getWorkdaysInPeriod = createSelector([getWorkdays, getPeriod], filterWorkdaysByPeriod);
