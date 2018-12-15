import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { mapDispatchProps } from '../../helpers';
import { updatePeriodWeekNumberAction, updatePeriodYearAction } from '../../store/actions';
import { State } from '../../store/states';
import { PeriodPicker } from './PeriodPicker';

import './PeriodControls.css';

interface StateProps {
    weekNumber: number;
    year: number;
}

const mapStateToProps = (state: State): StateProps => ({
    weekNumber: state.period.weekNumber,
    year: state.period.year
});

interface DispatchProps {
    updatePeriodWeekNumber: (year: number) => void;
    updatePeriodYear: (year: number) => void;
}

const mapDispatchToProps = mapDispatchProps({
    updatePeriodWeekNumber: updatePeriodWeekNumberAction,
    updatePeriodYear: updatePeriodYearAction
});

type PeriodControlsProps = StateProps & DispatchProps;

class PeriodControlsComponent extends React.PureComponent<PeriodControlsProps> {
    public render() {
        const { weekNumber, year } = this.props;

        const now = moment();

        return (
            <div className="period-controls">
                <PeriodPicker
                    value={year}
                    onUpdate={this.onUpdatePeriodYear}
                    disableIncrease={year === now.year()}
                />

                <PeriodPicker
                    value={weekNumber}
                    onUpdate={this.onUpdatePeriodWeekNumber}
                    disableIncrease={
                        year === now.year() && weekNumber === now.isoWeek() ||
                        weekNumber === moment().year(year).isoWeeksInYear()
                    }
                    disableDecrease={weekNumber === 1}
                />
            </div>
        );
    }

    private onUpdatePeriodWeekNumber = (weekNumber: number) => () => {
        const { updatePeriodWeekNumber } = this.props;

        updatePeriodWeekNumber(weekNumber);
    };

    private onUpdatePeriodYear = (year: number) => () => {
        const { updatePeriodYear } = this.props;

        updatePeriodYear(year);
    };
}

export const PeriodControls = connect(mapStateToProps, mapDispatchToProps)(PeriodControlsComponent);
