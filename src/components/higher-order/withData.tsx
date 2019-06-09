import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

import { getWorkdaysInPeriodAction } from '../../store/actions';
import { State } from '../../store/states';
import { Period } from '../../types';
import { Loader } from '../Loader';

export const withData = (dataString: string) => (Component: React.ComponentType) => {
    switch (dataString) {
        case 'workdays': {
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

            type WithDaysDataProps = StateProps & DispatchProps & RouteComponentProps;

            class WithDaysData extends React.Component<WithDaysDataProps> {
                public componentDidMount() {
                    this.fetchDays();
                }

                public shouldComponentUpdate(nextProps: WithDaysDataProps) {
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
                        ? <Loader text="Fetching data from server..."/>
                        : <Component/>;
                }

                private fetchDays = (props = this.props) => {
                    const { period, getWorkdaysInPeriod } = props;

                    getWorkdaysInPeriod(period);
                };
            }

            return connect(mapStateToProps, mapDispatchToProps)(WithDaysData);
        }
        default: {
            return () => <Component/>;
        }
    }
};
