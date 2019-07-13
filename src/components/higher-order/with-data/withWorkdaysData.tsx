import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getWorkdaysInPeriodAction } from '../../../store/actions';
import { State } from '../../../store/states';
import { Period } from '../../../types';
import { Loader } from '../../Loader';

interface StateProps {
    isFetching?: boolean;
    period: Period;
}

const mapStateToProps = (state: State): StateProps => ({
    isFetching: state.hours.isFetching,
    period: state.controls.period
});

interface DispatchProps {
    getWorkdaysInPeriod: (period: Period) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWorkdaysInPeriod: (period: Period) => getWorkdaysInPeriodAction(period)(dispatch)
});

type WithWorkdaysDataProps = StateProps & DispatchProps;

export const withWorkdaysData = (Component: React.ComponentType) => {
    class WithWorkdaysDataComponent extends React.Component<WithWorkdaysDataProps> {
        public componentDidMount() {
            this.fetchDays();
        }

        public shouldComponentUpdate(nextProps: WithWorkdaysDataProps) {
            const { period } = this.props;

            if (!nextProps.period.from.isSame(period.from, 'date') ||
                !nextProps.period.to.isSame(period.to, 'date')) {
                this.fetchDays(nextProps);
            }

            return true;
        }

        public render() {
            const { isFetching } = this.props;

            return isFetching
                ? <Loader text="Fetching workdays from server..."/>
                : <Component/>;
        }

        private fetchDays = (props = this.props) => {
            const { period, getWorkdaysInPeriod } = props;

            getWorkdaysInPeriod(period);
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithWorkdaysDataComponent);
};