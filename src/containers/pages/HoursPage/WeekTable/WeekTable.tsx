import { Moment } from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { Dispatch } from 'redux';

import { Card } from '../../../../components/Card';
import { Loader } from '../../../../components/Loader';
import {
    calculateTotalsForDates,
    calculateTotalsPerDate,
    padWithEmptyWorkdays,
    range,
    workdayComparator
} from '../../../../helpers';
import { updateWorkdaysAction } from '../../../../store/actions';
import { getWorkdaysInPeriod } from '../../../../store/selectors';
import { State } from '../../../../store/states';
import { Period, Project, Projects, Workdays } from '../../../../types';

import { WeekTableBody } from './WeekTableBody';
import { WeekTableHeader } from './WeekTableHeader';

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
        const { isStoring, projects } = this.props;
        const { modifiedWorkdays } = this.state;

        const isDirty = this.isDirty();

        const totalsPerDate = calculateTotalsPerDate(projects, modifiedWorkdays);
        const totals = calculateTotalsForDates(totalsPerDate);

        return (
            <React.Fragment>
                {isStoring && <Loader text="Storing data in server..."/>}

                <Prompt when={isDirty} message="You have unsaved changes. Are you sure you want to leave?"/>

                <Card className="week-table" level={3}>
                    <WeekTableHeader
                        isDirty={isDirty}
                        onSaveChanges={this.onSaveChanges}
                        onDiscardChanges={this.onDiscardChanges}
                    />

                    <WeekTableBody
                        dates={this.dates}
                        totalsPerDate={totalsPerDate}
                        totals={totals}
                        modifiedWorkdays={modifiedWorkdays}
                        onValueChange={this.onValueChange}
                    />
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
