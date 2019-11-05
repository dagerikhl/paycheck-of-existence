import * as classNames from 'classnames';
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
import {
    calculateTotalsForDates,
    calculateTotalsPerDate,
    padWithEmptyWorkdays,
    range,
    workdayComparator
} from '../../../helpers';
import { updateWorkdaysAction } from '../../../store/actions';
import { getWorkdaysInPeriod } from '../../../store/selectors';
import { State } from '../../../store/states';
import { Period, Project, Projects, Totals, Workdays } from '../../../types';

import { DataControls } from './DataControls';
import { TotalsRow } from './TotalsRow';

import './WeekTable.css';

interface OwnState {
    isEmptyWeek: boolean;
    modifiedWorkdays: Workdays;
}

interface StateProps {
    isStoring?: boolean;
    period: Period;
    projects: Projects;
    workdays: Workdays;
}

const mapStateToProps = (state: State): StateProps => ({
    isStoring: state.hours.isStoring,
    period: state.controls.period,
    projects: state.projects.projects,
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
        isEmptyWeek: true,
        modifiedWorkdays: padWithEmptyWorkdays(this.dates, this.props.projects, this.props.workdays)
    };

    public componentDidMount() {
        window.addEventListener('beforeunload', this.onUnload);
    }

    public componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onUnload);
    }

    public render() {
        const { isStoring, period, projects } = this.props;
        const { modifiedWorkdays } = this.state;

        const isDirty = this.isDirty();

        const totalsPerDate = calculateTotalsPerDate(projects, modifiedWorkdays);
        const totals = calculateTotalsForDates(totalsPerDate);

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

                        <DataControls
                            saveLabel="Save"
                            cancelLabel="Discard"
                            onSave={this.onSaveChanges}
                            onCancel={this.onDiscardChanges}
                            hide={!isDirty}
                        />
                    </h1>

                    <div className="content">
                        <div className="totals-row-container">
                            <div className="totals-row-offset"/>

                            <TotalsRow
                                showLabels={true}
                                showNegativeAndPositiveSs={true}
                                showTotalSs={false}
                                totals={totals}
                            />
                        </div>

                        {this.dates.map((date: Moment) => (
                            <div
                                className={classNames({
                                    'line': true,
                                    'non-workday': date.isoWeekday() > 5
                                })}
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
                                                            placeholder="Notes..."
                                                        />
                                                    </React.Fragment>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </Card>
            </React.Fragment>
        );
    }

    private onValueChange = (date: Moment, project: Project, key: 'hours' | 'ss' | 'notes') => {
        return (value: number | string) => {
            const { modifiedWorkdays } = this.state;

            const index = modifiedWorkdays.findIndex(workdayComparator(date, project));

            this.setState({
                isEmptyWeek: false,
                modifiedWorkdays: modifiedWorkdays.update(index, (workday) => workday.set(key, value))
            });
        };
    };

    private onSaveChanges = () => {
        const { updateWorkdays } = this.props;
        const { modifiedWorkdays } = this.state;

        updateWorkdays(modifiedWorkdays);
    };

    private onDiscardChanges = () => {
        const { projects, workdays } = this.props;

        if (workdays.size === 0) {
            this.setState({
                isEmptyWeek: true,
                modifiedWorkdays: padWithEmptyWorkdays(this.dates, projects, workdays)
            });
        } else {
            this.setState({ modifiedWorkdays: workdays });
        }
    };

    private onUnload = (event: Event) => {
        if (this.isDirty()) {
            event.preventDefault();
            event.returnValue = true;
        }
    };

    private isDirty = () => {
        const { workdays } = this.props;
        const { isEmptyWeek, modifiedWorkdays } = this.state;

        return !isEmptyWeek && !workdays.equals(modifiedWorkdays);
    };
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
