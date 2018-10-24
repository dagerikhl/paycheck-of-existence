import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { PeriodAction, updatePeriodYear } from '../store/actions/period.action';
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

const mapDispatchToProps = (dispatch: Dispatch<PeriodAction>): DispatchProps => bindActionCreators({
    updatePeriodYear
}, dispatch);

type PeriodPickerProps = StateProps & DispatchProps;

class PeriodPickerComponent extends React.PureComponent<PeriodPickerProps> {
    public render() {
        const { year } = this.props;

        return (
            <input
                className="period-picker"
                type="number"
                value={year}
                onChange={this.onChangePeriod}
            />
        );
    }

    private onChangePeriod = (event: React.FormEvent<HTMLInputElement>) => {
        const [max, min] = [2018, 2999];
        const newYear = Math.min(min, Math.max(max, event.currentTarget.valueAsNumber));
        this.props.updatePeriodYear(newYear);
    };
}

export const PeriodPicker = connect(mapStateToProps, mapDispatchToProps)(PeriodPickerComponent);
