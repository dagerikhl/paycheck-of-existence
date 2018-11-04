import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { DATE_LONG, Week, Weeks } from '../../constants';
import { createArrayFromRange, createDispatchToPropsFunction, getNewestWeekNumberInYear } from '../../helpers';
import { database } from '../../services';
import { updateAllWeeksAction } from '../../store/actions';
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
                weeks: Weeks;
            }

            const mapStateToProps = (state: State): StateProps => ({
                year: state.period.year,
                weeks: state.hours.weeks
            });

            interface DispatchProps {
                updateAllWeeks: (weeks: Weeks) => void;
            }

            const mapDispatchToProps = createDispatchToPropsFunction({
                updateAllWeeks: updateAllWeeksAction
            });

            type WithDataPropsWeeks = StateProps & DispatchProps & RouteComponentProps;

            class WithWeeksData extends React.Component<WithDataPropsWeeks, OwnState> {
                public state: OwnState = { isLoaded: false };

                public componentDidMount() {
                    const { year, updateAllWeeks } = this.props;

                    database.hoursRef.on('value', (snapshot) => {
                        let weeks: Weeks = {};
                        if (snapshot) {
                            weeks = snapshot.val()[year];
                        }

                        if (!this.isValidWeeks(weeks)) {
                            const initialWeekNumbers = createArrayFromRange(1, getNewestWeekNumberInYear(year));
                            initialWeekNumbers.forEach((weekNumber) => {
                                const week: Week = {};
                                createArrayFromRange(0, 7).forEach((_, i) => [
                                    moment().startOf('isoWeek').add(i, 'day').format(DATE_LONG),
                                    ...createArrayFromRange(0, 5).map(() => 0),
                                    'place'
                                ]);

                                weeks[weekNumber] = week;
                            });
                        }


                        updateAllWeeks(weeks);

                        this.setState({ isLoaded: true });
                    });
                }

                public render() {
                    const { isLoaded } = this.state;

                    return isLoaded
                        ? <Component {...this.props}/>
                        : <Loader/>;
                }

                private isValidWeeks = (weeks: Weeks) => {
                    return true;
                };
            }

            return connect(mapStateToProps, mapDispatchToProps)(WithWeeksData);
        }
        default: {
            return ((props) => <Component {...props}/>) as React.SFC;
        }
    }
};
