import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { mapDispatchProps } from '../../helpers';
import { database } from '../../services';
import { updateWorkdaysAction } from '../../store/actions';
import { getUserId } from '../../store/selectors';
import { State } from '../../store/states';
import { Period, Workdays } from '../../types';
import { Loader } from '../Loader';

interface CommonState {
    isLoaded: boolean;
}

interface CommonStateProps {
    userId: string;
}

export const withData = (dataString: string) => (Component: React.ComponentType) => {
    switch (dataString) {
        case 'workdays': {
            interface StateProps {
                period: Period;
            }

            const mapStateToProps = (state: State): CommonStateProps & StateProps => ({
                userId: getUserId(state),
                period: state.controls.period
            });

            interface DispatchProps {
                updateWorkdays: (workdays: Workdays) => void;
            }

            const mapDispatchToProps = mapDispatchProps({
                updateWorkdays: updateWorkdaysAction
            });

            type WithDaysDataProps = CommonStateProps & StateProps & DispatchProps & RouteComponentProps;

            class WithDaysData extends React.Component<WithDaysDataProps, CommonState> {
                public state: CommonState = { isLoaded: false };

                public componentDidMount() {
                    this.fetchDays();
                }

                public shouldComponentUpdate(nextProps: WithDaysDataProps) {
                    const { period } = this.props;

                    if (nextProps.period.from !== period.from || nextProps.period.to !== period.to) {
                        this.fetchDays(nextProps);
                    }

                    return true;
                }

                public render() {
                    const { isLoaded } = this.state;

                    return isLoaded
                        ? <Component/>
                        : <Loader text="Fetching data from server..."/>;
                }

                private fetchDays = (props = this.props) => {
                    const { userId, period, updateWorkdays } = props;

                    this.setState({ isLoaded: false });

                    database(userId).workdays.getInPeriod(period.from, period.to)
                        .then((workdays) => {
                            updateWorkdays(workdays);

                            this.setState({ isLoaded: true });
                        })
                        .catch((error) => {
                            // TODO Handle and display this error to the user
                            console.error(error);

                            this.setState({ isLoaded: true });
                        });
                };
            }

            return connect(mapStateToProps, mapDispatchToProps)(WithDaysData);
        }
        default: {
            return () => <Component/>;
        }
    }
};
