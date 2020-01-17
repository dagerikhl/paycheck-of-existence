import * as classNames from 'classnames';
import { Moment } from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Input } from '../../../../components/Input';
import { DATE_FORMATS } from '../../../../constants';
import { InputCellType } from '../../../../enums';
import { State } from '../../../../store/states';
import { Project, Projects, Totals, TotalsDateCollection, Workdays } from '../../../../types';
import { TotalsRow } from '../TotalsRow';

import './WeekTableBody.css';

interface StateProps {
    projects: Projects;
}

const mapStateToProps = (state: State): StateProps => ({
    projects: state.projects.projects
});

interface OwnProps {
    dates: Moment[];
    totalsPerDate: TotalsDateCollection;
    totals: Totals;
    modifiedWorkdays: Workdays;
    onValueChange: (date: Moment, project: Project, key: 'hours' | 'ss' | 'notes') => (value: number | string) => void;
}

type WeekTableBodyProps = StateProps & OwnProps;

const WeekTableBodyComponent: React.FC<WeekTableBodyProps> = (
    {
        dates,
        totalsPerDate,
        totals,
        modifiedWorkdays,
        onValueChange,
        projects
    }
) => {
    return (
        <div className="week-table-body">
            <div className="totals-row-container">
                <div className="totals-row-offset"/>

                <TotalsRow showLabels={true} showNegativeAndPositiveSs={true} showTotalSs={false} totals={totals}/>
            </div>

            {dates.map((date: Moment) => (
                <div
                    className={classNames({ 'line': true, 'non-workday': date.isoWeekday() > 5 })}
                    key={date.format(DATE_FORMATS.long)}
                >
                    <div className="line-header">
                        <div className="line-header-label totals-row-offset">
                            {date.format(DATE_FORMATS.long)}
                        </div>

                        {totalsPerDate.has(date) && (
                            <TotalsRow
                                showNegativeAndPositiveSs={true}
                                showTotalSs={false}
                                totals={totalsPerDate.get(date) as Totals}
                            />
                        )}
                    </div>

                    {projects
                        .filter((project) => project.get('show'))
                        .map((project) => (
                            <div className="project" key={project.get('id')}>
                                <div className="project-header">{project.get('name')}</div>

                                {modifiedWorkdays
                                    .filter((workday) => (
                                        workday.get('projectId') === project.get('id') &&
                                        workday.get('date').isSame(date, 'date')
                                    ))
                                    .map((workday) => (
                                        <React.Fragment key={`${date.format(DATE_FORMATS.long)}:${project.get('id')}`}>
                                            <Input
                                                className="hours"
                                                type={InputCellType.NUMBER}
                                                value={workday.get('hours')}
                                                onValueChange={onValueChange(date, project, 'hours')}
                                                min={-24}
                                                max={24}
                                                step={0.5}
                                            />
                                            <Input
                                                className="ss"
                                                type={InputCellType.NUMBER}
                                                value={workday.get('ss')}
                                                onValueChange={onValueChange(date, project, 'ss')}
                                                min={-24}
                                                max={24}
                                                step={0.5}
                                            />
                                            <Input
                                                className="notes"
                                                type={InputCellType.TEXT}
                                                value={workday.get('notes')}
                                                onValueChange={onValueChange(date, project, 'notes')}
                                                placeholder="Notes..."
                                            />
                                        </React.Fragment>
                                    ))}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export const WeekTableBody = connect(mapStateToProps)(WeekTableBodyComponent);
