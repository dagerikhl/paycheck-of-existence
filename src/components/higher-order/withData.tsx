import { Map } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Day } from '../../constants';
import { createDispatchToPropsFunction } from '../../helpers';
import { database } from '../../services';
import { updateAllDaysAction, updateInitialDaysAction } from '../../store/actions';
import { State } from '../../store/states';
import { Loader } from '../Loader';

interface OwnState {
    isLoaded: boolean;
}

export const withData = (dataString: string) => (Component: React.ComponentType) => {
    switch (dataString) {
        case 'days': {
            interface StateProps {
                year: number;
            }

            const mapStateToProps = (state: State): StateProps => ({
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

            type WithDaysDataProps = StateProps & DispatchProps & RouteComponentProps;

            class WithDaysData extends React.Component<WithDaysDataProps, OwnState> {
                public state: OwnState = { isLoaded: false };

                public componentDidMount() {
                    const { year, updateAllDays, updateInitialDays } = this.props;

                    database.hoursRef.on('value', (snapshot) => {
                        const allValues: { [year: number]: Map<string, Day> } = snapshot && snapshot.val();
                        const days: Map<string, Day> = allValues && allValues[year] || Map<string, Day>();

                        updateAllDays(days);
                        updateInitialDays(days);

                        this.setState({ isLoaded: true });
                    });
                }

                public render() {
                    const { isLoaded } = this.state;

                    return isLoaded
                        ? <Component/>
                        : <Loader/>;
                }
            }

            return connect(mapStateToProps, mapDispatchToProps)(WithDaysData);
        }
        default: {
            return (() => <Component/>) as React.SFC;
        }
    }
};
