import { List, Record } from 'immutable';
import * as moment from 'moment';

import { DATE_FORMATS } from '../constants';
import { WorkdayJs, Workdays, WorkdaysDb, WorkdaysJs } from '../types';
import { objectKeys } from './object-helper';

export const parseWorkdaysDb = (workdaysDb: WorkdaysDb, filter?: (workdayJs: WorkdayJs) => boolean): Workdays => {
    let workdays: Workdays = List();
    if (workdaysDb) {
        const filteredWorkdays: WorkdaysJs = [];
        for (const projectId of objectKeys(workdaysDb)) {
            for (const dateString of objectKeys(workdaysDb[projectId])) {
                const workdayJs = {
                    ...workdaysDb[projectId][dateString],
                    date: moment(dateString, DATE_FORMATS.storage),
                    projectId
                };

                if (!filter || filter(workdayJs)) {
                    filteredWorkdays.push(workdayJs);
                }
            }
        }

        workdays = List(filteredWorkdays.map((filteredWorkday) => Record(filteredWorkday)()));
    }

    return workdays;
};
