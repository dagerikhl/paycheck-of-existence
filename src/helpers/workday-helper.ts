import { Record } from 'immutable';
import { Moment } from 'moment';

import { Project, Projects, Totals, TotalsCollection, Workday, Workdays } from '../types';

export const calculateTotalsForDates = (totalsPerDate: TotalsCollection): Totals => {
    return totalsPerDate
        .reduce((result, current) => {
            return {
                hours: result.hours + current.hours,
                ss: result.ss + current.ss
            };
        }, { hours: 0, ss: 0 });
};

export const calculateTotalsPerDate = (projects: Projects, workdays: Workdays): TotalsCollection => {
    return workdays
        .groupBy((workday) => workday.get('date'))
        .map((projectWorkdays) => {
            return projectWorkdays.reduce((result, current) => {
                return {
                    hours: result.hours + current.get('hours'),
                    ss: result.ss + current.get('ss')
                };
            }, { hours: 0, ss: 0 });
        })
        .toMap();
};

export const padWithEmptyWorkdays = (dates: Moment[], projects: Projects, workdays: Workdays): Workdays => {
    let paddedWorkdays = workdays;
    for (const date of dates) {
        for (const project of projects.toArray()) {
            if (!workdays.some(workdayComparator(date, project))) {
                paddedWorkdays = paddedWorkdays.push(Record({
                    date,
                    hours: 0,
                    notes: '',
                    projectId: project.get('id'),
                    ss: 0
                })());
            }
        }
    }

    return paddedWorkdays;
};

export const workdayComparator = (date: Moment, project: Project) => {
    return (workday: Workday) => {
        return workday.get('date').isSame(date, 'date') && workday.get('projectId') === project.get('id');
    };
};
