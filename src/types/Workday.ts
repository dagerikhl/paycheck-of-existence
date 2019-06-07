import { Record } from 'immutable';
import * as moment from 'moment';

export interface WorkdayJs {
    date: moment.Moment;
    hours: number;
    notes: string;
    projectId: string;
    ss: number;
}

export type Workday = Record<WorkdayJs>;
