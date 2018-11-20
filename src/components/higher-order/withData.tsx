import { Map } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Day } from '../../constants';
import { createDispatchToPropsFunction } from '../../helpers';
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
                year: number;
            }

            const mapStateToProps = (state: State): CommonStateProps & StateProps => ({
                userId: getUserId(state),
                year: state.period.year
            });

            interface DispatchProps {
                updateAllDays: (days: Map<string, Day>) => void;
                updateInitialDays: (days: Map<string, Day>) => void;
            }

            const mapDispatchToProps = createDispatchToPropsFunction({
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
                    const { year } = this.props;

                    if (nextProps.year !== year) {
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
                    const { userId, year, updateAllDays, updateInitialDays } = props;

                    this.setState({ isLoaded: false });

                    database.getUserRef(userId).child('hours').on('value', (snapshot) => {
                        const allValues = snapshot && snapshot.val();
                        const days = allValues && Map<string, Day>(allValues[year]) || Map<string, Day>();

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
