import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Weeks } from '../../constants';
import { createDispatchToPropsFunction } from '../../helpers';
import { database } from '../../services';
import { updateAllWeeksAction, updateInitialWeeksAction } from '../../store/actions';
import { State } from '../../store/states';
import { Loader } from '../Loader';

interface OwnState {
    isLoaded: boolean;
}

export const withData = (dataString: string) => (Component: React.ComponentType) => {
    switch (dataString) {
        case 'weeks': {
            interface StateProps {
                year: number;
            }

            const mapStateToProps = (state: State): StateProps => ({
                year: state.period.year
            });

            interface DispatchProps {
                updateAllWeeks: (weeks: Weeks) => void;
                updateInitialWeeks: (weeks: Weeks) => void;
            }

            const mapDispatchToProps = createDispatchToPropsFunction({
                updateAllWeeks: updateAllWeeksAction,
                updateInitialWeeks: updateInitialWeeksAction
            });

            type WithDataPropsWeeks = StateProps & DispatchProps & RouteComponentProps;

            class WithWeeksData extends React.Component<WithDataPropsWeeks, OwnState> {
                public state: OwnState = { isLoaded: false };

                public componentDidMount() {
                    const { year, updateAllWeeks, updateInitialWeeks } = this.props;

                    database.hoursRef.on('value', (snapshot) => {
                        const allValues = snapshot && snapshot.val();
                        const yearValue = allValues && allValues[year];

                        const weeks = yearValue || {};

                        updateAllWeeks(weeks);
                        updateInitialWeeks(weeks);

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

            return connect(mapStateToProps, mapDispatchToProps)(WithWeeksData);
        }
        default: {
            return (() => <Component/>) as React.SFC;
        }
    }
};
