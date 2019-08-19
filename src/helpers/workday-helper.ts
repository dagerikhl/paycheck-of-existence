import { Record } from 'immutable';
import { Moment } from 'moment';

import { Project, Projects, Totals, TotalsDateCollection, TotalsProjectCollection, Workday, Workdays } from '../types';

const totalsMapper = (workdays: Workdays) => {
    return workdays.reduce((result, current) => {
        return {
            hours: result.hours + current.get('hours'),
            ss: result.ss + current.get('ss')
        };
    }, { hours: 0, ss: 0 });
};

export const calculateTotalsForDates = (totalsPerDate: TotalsDateCollection): Totals => {
    return totalsPerDate
        .reduce((result, current) => {
            return {
                hours: result.hours + current.hours,
                ss: result.ss + current.ss
            };
        }, { hours: 0, ss: 0 });
};

export const calculateTotalsPerDate = (projects: Projects, workdays: Workdays): TotalsDateCollection => {
    return workdays
        .groupBy<Moment>((workday) => workday.get('date'))
        .map(totalsMapper)
        .toMap();
};

export const calculateTotalsPerProject = (projects: Projects, workdays: Workdays): TotalsProjectCollection => {
    return workdays
        .groupBy<string>((workday) => workday.get('projectId'))
        .map(totalsMapper)
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
