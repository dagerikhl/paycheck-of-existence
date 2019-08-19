import { Map } from 'immutable';
import { Moment } from 'moment';

import { Totals } from './Totals';

export type TotalsDateCollection = Map<Moment, Totals>;
