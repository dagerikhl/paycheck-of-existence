import { List } from 'immutable';

import { Workday, WorkdayJs } from './';

export interface WorkdaysDb {
    [projectId: string]: {
        [dateString: string]: {
            hours: number;
            notes: string;
            ss: number;
        };
    };
}

export type WorkdaysJs = WorkdayJs[];

export type Workdays = List<Workday>;
