import { State } from '../states';

// Selectors

export const getYear = (state: State) => state.period.year;

export const getWeekNumber = (state: State) => state.period.weekNumber;
