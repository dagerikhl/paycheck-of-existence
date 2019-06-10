import * as classNames from 'classnames';
import { List, Record } from 'immutable';
import { Moment } from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { Dispatch } from 'redux';

import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Loader } from '../../../components/Loader';
import { DATE_FORMATS } from '../../../constants';
import { InputCellType } from '../../../enums';
import { range } from '../../../helpers';
import { updateWorkdaysAction } from '../../../store/actions';
import { getWorkdaysInPeriod } from '../../../store/selectors';
import { State } from '../../../store/states';
import { Period, Project, Projects, Workday, Workdays } from '../../../types';

import { DataControls } from './DataControls';

import './WeekTable.css';

const workdayComparator = (date: Moment, project: Project) => {
    return (workday: Workday) => {
        return workday.get('date').isSame(date, 'date') && workday.get('projectId') === project.get('id');
    };
};

const padWithEmptyWorkdays = (dates: Moment[], projects: Projects, workdays: Workdays): Workdays => {
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

interface OwnState {
    modifiedWorkdays: Workdays;
}

interface StateProps {
    isStoring?: boolean;
    period: Period;
    projects: Projects;
    workdays: Workdays;
}

// TODO Replace with real projects from state when implemented
const dummyProjects: Projects = List([
    Record({
        grantsOvertime: true,
        id: 'project_dummy-uuid-internal',
        maxOvertime: -1,
        name: 'Interntid',
        workdayLength: 7.5
    })(),
    Record({
        grantsOvertime: true,
        id: 'project_dummy-uuid-nova',
        maxOvertime: 4,
        name: 'Nova Engage',
        workdayLength: 7.5
    })(),
    Record({
        grantsOvertime: false,
        id: 'project_dummy-uuid-own-time',
        maxOvertime: 0,
        name: 'Egentid',
        workdayLength: 7.5
    })(),
    Record({
        grantsOvertime: true,
        id: 'project_dummy-uuid-smb-lab-driv',
        maxOvertime: -1,
        name: 'SMB Lab - DRIV',
        workdayLength: 8
    })()
]);

const mapStateToProps = (state: State): StateProps => ({
    isStoring: state.hours.isStoring,
    period: state.controls.period,
    projects: dummyProjects,
    workdays: getWorkdaysInPeriod(state)
});

interface DispatchProps {
    updateWorkdays: (workdays: Workdays) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateWorkdays: (workdays: Workdays) => updateWorkdaysAction(workdays)(dispatch)
});

type WeekTableProps = StateProps & DispatchProps;

class WeekTableComponent extends React.PureComponent<WeekTableProps, OwnState> {
    private dates: Moment[] = range(0, 7).map((n) => this.props.period.from.clone().add(n, 'days'));

    public state: OwnState = {
        modifiedWorkdays: padWithEmptyWorkdays(this.dates, this.props.projects, this.props.workdays)
    };

    public render() {
        const { isStoring, period, projects } = this.props;
        const { modifiedWorkdays } = this.state;

        const isDirty = this.isDirty();

        return (
            <React.Fragment>
                {isStoring && <Loader text="Storing data in server..."/>}

                <Prompt when={isDirty} message="You have unsaved changes. Are you sure you want to leave?"/>

                <Card className="week-table" level={3}>
                    <h1 className="title">
                        <div>Week {period.from.isoWeek()}</div>

                        <div className="dates">
                            {period.from.format(DATE_FORMATS.longWithYear)}
                            &nbsp;&ndash;&nbsp;
                            {period.to.format(DATE_FORMATS.longWithYear)}
                        </div>
                    </h1>

                    <div className="content">
                        {this.dates.map((date: Moment) => (
                            <div
                                className={classNames({
                                    'date': true,
                                    'non-workday': date.isoWeekday() > 5
                                })}
                                key={date.format(DATE_FORMATS.long)}
                            >
                                <div className="date-header">{date.format(DATE_FORMATS.long)}</div>

                                {projects.map((project) => (
                                    <div className="project" key={project.get('id')}>
                                        <div className="project-header">{project.get('name')}</div>

                                        {modifiedWorkdays
                                            .filter((workday) => (
                                                workday.get('projectId') === project.get('id') &&
                                                workday.get('date').isSame(date, 'date')
                                            ))
                                            .map((workday) => (
                                                <React.Fragment
                                                    key={`${date.format(DATE_FORMATS.long)}:${project.get('id')}`}
                                                >
                                                    <Input
                                                        className="hours"
                                                        type={InputCellType.NUMBER}
                                                        value={workday.get('hours')}
                                                        onValueChange={this.onValueChange(date, project, 'hours')}
                                                        min={-24}
                                                        max={24}
                                                        step={0.5}
                                                    />
                                                    <Input
                                                        className="ss"
                                                        type={InputCellType.NUMBER}
                                                        value={workday.get('ss')}
                                                        onValueChange={this.onValueChange(date, project, 'ss')}
                                                        min={-24}
                                                        max={24}
                                                        step={0.5}
                                                    />
                                                    <Input
                                                        className="notes"
                                                        type={InputCellType.TEXT}
                                                        value={workday.get('notes')}
                                                        onValueChange={this.onValueChange(date, project, 'notes')}
                                                    />
                                                </React.Fragment>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Card>

                <DataControls
                    label={`You have unsaved changes in week ${period.from.isoWeek()}.`}
                    saveLabel="Save"
                    cancelLabel="Discard"
                    onSave={this.onSaveChanges}
                    onCancel={this.onDiscardChanges}
                    hide={!isDirty}
                />
            </React.Fragment>
        );
    }

    private onValueChange = (date: Moment, project: Project, key: 'hours' | 'ss' | 'notes') => {
        return (value: number | string) => {
            const { modifiedWorkdays } = this.state;

            const index = modifiedWorkdays.findIndex(workdayComparator(date, project));

            this.setState({ modifiedWorkdays: modifiedWorkdays.update(index, (workday) => workday.set(key, value)) });
        };
    };

    private onSaveChanges = () => {
        const { updateWorkdays } = this.props;
        const { modifiedWorkdays } = this.state;

        updateWorkdays(modifiedWorkdays);
    };

    private onDiscardChanges = () => {
        const { workdays } = this.props;

        this.setState({ modifiedWorkdays: workdays });
    };

    private isDirty = () => {
        const { workdays } = this.props;
        const { modifiedWorkdays } = this.state;

        return !workdays.equals(modifiedWorkdays);
    };
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
