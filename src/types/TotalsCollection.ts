import { Map } from 'immutable';
import { Moment } from 'moment';

import { Totals } from './Totals';

export type TotalsCollection = Map<Moment, Totals>;
