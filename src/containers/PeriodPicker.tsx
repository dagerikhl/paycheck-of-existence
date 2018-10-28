import * as React from 'react';
import { connect } from 'react-redux';

import { createDispatchToPropsFunction } from '../helpers/redux-helper';
import { updatePeriodYearAction } from '../store/actions/period.action';
import { State } from '../store/states/state';

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

const mapDispatchToProps = createDispatchToPropsFunction({
    updatePeriodYear: updatePeriodYearAction
});

type PeriodPickerProps = StateProps & DispatchProps;

class PeriodPickerComponent extends React.PureComponent<PeriodPickerProps> {
    public render() {
        const { year } = this.props;

        return (
            <div className="period-picker">
                <span className="year">{year}</span>

                <div className="controls">
                    <button onClick={this.onChangePeriod(1)} aria-label="Increase">
                        <div className="control-icon-up"/>
                    </button>
                    <button onClick={this.onChangePeriod(-1)} aria-label="Decrease">
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
