import { Map } from 'immutable';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { mapDispatchProps, objectKeys } from '../../helpers';
import { Day, Period } from '../../interfaces';
import { database } from '../../services';
import { updateAllDaysAction, updateInitialDaysAction } from '../../store/actions';
import { getUserId } from '../../store/selectors';
import { State } from '../../store/states';
import { Loader } from '../Loader';
import { withAuthorization } from './withAuthorization';

interface CommonState {
    isLoaded: boolean;
}

interface CommonStateProps {
    userId: string;
}

export const withData = (dataString: string) => (Component: React.ComponentType) => {
    switch (dataString) {
        case 'days': {
            interface StateProps {
                period: Period;
            }

            const mapStateToProps = (state: State): CommonStateProps & StateProps => ({
                userId: getUserId(state),
                period: state.period.period
            });

            interface DispatchProps {
                updateAllDays: (days: Map<string, Day>) => void;
                updateInitialDays: (days: Map<string, Day>) => void;
            }

            const mapDispatchToProps = mapDispatchProps({
                updateAllDays: updateAllDaysAction,
                updateInitialDays: updateInitialDaysAction
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
                    const { userId, period, updateAllDays, updateInitialDays } = props;

                    this.setState({ isLoaded: false });

                    database.getUserRef(userId).child('hours').on('value', (snapshot) => {
                        const allValues = snapshot && snapshot.val();

                        let days = Map<string, Day>();
                        if (allValues) {
                            const flattened = {};
                            for (const year of objectKeys(allValues)) {
                                for (const dateString of objectKeys(allValues[year])) {
                                    flattened[dateString] = allValues[year][dateString];
                                }
                            }

                            const filtered = {};
                            for (const dateString of objectKeys(flattened)) {
                                const date = moment(dateString, 'YYYY-MM-DD');
                                if (date.isBetween(period.from, period.to, undefined, '[]')) {
                                    filtered[dateString] = flattened[dateString];
                                }
                            }

                            days = Map<string, Day>(filtered as any);
                        }

                        updateAllDays(days);
                        updateInitialDays(days);

                        this.setState({ isLoaded: true });
                    });
                };
            }

            return withAuthorization(connect(mapStateToProps, mapDispatchToProps)(WithDaysData));
        }
        default: {
            return () => <Component/>;
        }
    }
};
