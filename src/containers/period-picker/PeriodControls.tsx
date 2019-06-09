import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { withAuthorization } from '../../components/higher-order/withAuthorization';
import { getNewestWeekNumberInYear, mapSynchronousDispatchProps } from '../../helpers';
import { updatePeriodAction } from '../../store/actions';
import { State } from '../../store/states';
import { Period } from '../../types';
import { PeriodPicker } from './PeriodPicker';

import './PeriodControls.css';

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

type PeriodControlsProps = StateProps & DispatchProps;

class PeriodControlsComponent extends React.PureComponent<PeriodControlsProps> {
    public render() {
        const { period } = this.props;

        const now = moment();

        const year = this.getYearCorrectedForNewyear();
        // This has to use period.to to ensure the week containing January 1st is counted as the first week of the year
        const weekNumber = period.to.isoWeek();

        return (
            <div className="period-controls">
                <PeriodPicker
                    value={year}
                    onUpdate={this.onUpdateYear}
                    disableIncrease={year === now.year()}
                />

                <PeriodPicker
                    value={weekNumber}
                    onUpdate={this.onUpdateWeekNumber}
                    disableIncrease={
                        year === now.year() && weekNumber === now.isoWeek() ||
                        weekNumber === moment().year(year).isoWeeksInYear()
                    }
                    disableDecrease={weekNumber === 1}
                />
            </div>
        );
    }

    private onUpdateYear = (year: number) => () => {
        const { updatePeriod } = this.props;

        const newestWeekNumber = getNewestWeekNumberInYear(year);
        const newWeek = moment().year(year).isoWeek(newestWeekNumber);

        updatePeriod({
            from: newWeek.clone().startOf('isoWeek'),
            to: newWeek.clone().endOf('isoWeek')
        });
    };

    private onUpdateWeekNumber = (weekNumber: number) => () => {
        const { updatePeriod } = this.props;

        const year = this.getYearCorrectedForNewyear();
        const newWeek = moment().year(year).isoWeek(weekNumber);

        updatePeriod({
            from: newWeek.clone().startOf('isoWeek'),
            to: newWeek.clone().endOf('isoWeek')
        });
    };

    private getYearCorrectedForNewyear = () => {
        const { period } = this.props;

        return (period.from.isoWeek() === 1 ? period.to : period.from).year();
    };
}

export const PeriodControls = withAuthorization(connect(mapStateToProps, mapDispatchToProps)(PeriodControlsComponent));
