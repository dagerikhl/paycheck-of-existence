import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { getNewestWeekNumberInYear, mapSynchronousDispatchProps } from '../../helpers';
import { updatePeriodAction } from '../../store/actions';
import { State } from '../../store/states';
import { Period } from '../../types';
import { PeriodPicker } from './PeriodPicker';

import './PeriodControls.css';

interface OwnProps {
    shouldPromptOnDirty?: boolean;
    isDirty?: boolean;
}

interface StateProps {
    period: Period;
}

const mapStateToProps = (state: State): StateProps => ({
    period: state.controls.period
});

interface DispatchProps {
    updatePeriod: (period: Period) => void;
}

const mapDispatchToProps = mapSynchronousDispatchProps({
    updatePeriod: updatePeriodAction
});

type PeriodControlsProps = OwnProps & StateProps & DispatchProps;

class PeriodControlsComponent extends React.PureComponent<PeriodControlsProps> {
    public componentDidMount() {
        window.addEventListener('keydown', this.onKeyboardShortcut);
    }

    public componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyboardShortcut);
    }

    public render() {
        const { period } = this.props;

        const year = this.getYearCorrectedForNewyear();
        // This has to use period.to to ensure the week containing January 1st is counted as the first week of the year
        const weekNumber = period.to.isoWeek();

        return (
            <div className="period-controls">
                <PeriodPicker
                    value={year}
                    onUpdate={this.onUpdateYear}
                    tooltipIncrease="SHIFT+PageUp"
                    tooltipDecrease="SHIFT+PageDown"
                    disableIncrease={this.shouldDisableIncreaseYear()}
                />

                <PeriodPicker
                    value={weekNumber}
                    onUpdate={this.onUpdateWeekNumber}
                    tooltipIncrease="PageUp"
                    tooltipDecrease="PageDown"
                    disableIncrease={this.shouldDisableIncreaseWeekNumber()}
                    disableDecrease={this.shouldDisableDecreaseWeekNumber()}
                />
            </div>
        );
    }

    private onUpdateYear = (year: number) => () => {
        const { updatePeriod } = this.props;

        const newestWeekNumber = getNewestWeekNumberInYear(year);
        const newWeek = moment().year(year).isoWeek(newestWeekNumber);

        if (!this.shouldPromptUser() || this.shouldPromptUser() && this.promptUser()) {
            updatePeriod({
                from: newWeek.clone().startOf('isoWeek'),
                to: newWeek.clone().endOf('isoWeek')
            });
        }
    };

    private onUpdateWeekNumber = (weekNumber: number) => () => {
        const { updatePeriod } = this.props;

        const year = this.getYearCorrectedForNewyear();
        const newWeek = moment().year(year).isoWeek(weekNumber);

        if (!this.shouldPromptUser() || this.shouldPromptUser() && this.promptUser()) {
            updatePeriod({
                from: newWeek.clone().startOf('isoWeek'),
                to: newWeek.clone().endOf('isoWeek')
            });
        }
    };

    private onKeyboardShortcut = (event: KeyboardEvent) => {
        const { period } = this.props;

        if (event.shiftKey && event.key === 'PageUp') {
            if (!this.shouldDisableIncreaseYear()) {
                this.onUpdateYear(period.from.year() + 1)();
            }

            event.preventDefault();
        } else if (event.shiftKey && event.key === 'PageDown') {
            this.onUpdateYear(period.from.year() - 1)();

            event.preventDefault();
        } else if (event.key === 'PageUp') {
            if (!this.shouldDisableIncreaseWeekNumber()) {
                this.onUpdateWeekNumber(period.to.isoWeek() + 1)();
            }

            event.preventDefault();
        } else if (event.key === 'PageDown') {
            if (!this.shouldDisableDecreaseWeekNumber()) {
                this.onUpdateWeekNumber(period.to.isoWeek() - 1)();
            }

            event.preventDefault();
        }
    };

    private getYearCorrectedForNewyear = () => {
        const { period } = this.props;

        return (period.from.isoWeek() === 1 ? period.to : period.from).year();
    };

    private shouldDisableIncreaseYear = () => {
        const now = moment();
        const year = this.getYearCorrectedForNewyear();

        return year === now.year();
    };

    private shouldDisableIncreaseWeekNumber = () => {
        const { period } = this.props;

        const now = moment();
        const year = this.getYearCorrectedForNewyear();
        const weekNumber = period.to.isoWeek();

        return (
            year === now.year() && weekNumber === now.isoWeek() ||
            weekNumber === moment().year(year).isoWeeksInYear()
        );
    };

    private shouldDisableDecreaseWeekNumber = () => {
        const { period } = this.props;

        const weekNumber = period.to.isoWeek();

        return weekNumber === 1;
    };

    private shouldPromptUser = () => {
        const { shouldPromptOnDirty, isDirty } = this.props;

        return shouldPromptOnDirty && isDirty;
    };

    private promptUser = () => {
        return confirm('You have unsaved changes. Are you sure you want to change the period?');
    };
}

export const PeriodControls = connect(mapStateToProps, mapDispatchToProps)(PeriodControlsComponent);
