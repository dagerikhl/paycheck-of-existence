import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { mapDispatchProps } from '../helpers';
import { updatePeriodYearAction } from '../store/actions';
import { State } from '../store/states';

import './PeriodPicker.css';

interface StateProps {
    year: number;
}

const mapStateToProps = (state: State): StateProps => ({
    year: state.period.year
});

interface DispatchProps {
    updatePeriodYear: (year: number) => void;
}

const mapDispatchToProps = mapDispatchProps({
    updatePeriodYear: updatePeriodYearAction
});

type PeriodPickerProps = StateProps & DispatchProps;

class PeriodPickerComponent extends React.PureComponent<PeriodPickerProps> {
    private readonly currentYear = moment().year();

    public render() {
        const { year } = this.props;

        const isCurrentYear = year >= this.currentYear;

        return (
            <div className="period-picker">
                <span className="year">{year}</span>

                <div className="controls">
                    <button
                        aria-label="Increase"
                        onClick={this.onChangePeriod(1)}
                        disabled={isCurrentYear}
                    >
                        <div className="control-icon-up"/>
                    </button>

                    <button
                        aria-label="Decrease"
                        onClick={this.onChangePeriod(-1)}
                    >
                        <div className="control-icon-down"/>
                    </button>
                </div>
            </div>
        );
    }

    private onChangePeriod = (value: number) => () => {
        const { year, updatePeriodYear } = this.props;

        updatePeriodYear(year + value);
    };
}

export const PeriodPicker = connect(mapStateToProps, mapDispatchToProps)(PeriodPickerComponent);
