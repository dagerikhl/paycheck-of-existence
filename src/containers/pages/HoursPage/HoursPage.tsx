import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../../components/Button';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { Theme, Weeks } from '../../../constants';
import { createArrayFromRange } from '../../../helpers';
import { State } from '../../../store/states';
import { WeekTable } from './WeekTable';

import './HoursPage.css';

interface OwnState {
    lastVisibleWeekNumber: number;
}

interface StateProps {
    weeks: Weeks;
}

const mapStateToProps = (state: State): StateProps => ({
    weeks: state.hours.weeks
});

class HoursPageComponent extends React.PureComponent<StateProps, OwnState> {
    private readonly currentWeek = moment().isoWeek();

    private weeks = createArrayFromRange(0, moment().isoWeek()).reverse();

    public state: OwnState = {
        lastVisibleWeekNumber: Math.max(1, this.currentWeek - 1)
    };

    public componentDidMount() {
        // TODO Start loading documents from the database
    }

    public render() {
        const { lastVisibleWeekNumber } = this.state;

        return (
            <section className="hours-page">
                <div className="weeks">
                    {/* TODO Should use weeks from Redux here */}
                    {this.weeks
                        .filter((weekNumber) => weekNumber >= lastVisibleWeekNumber)
                        .map((weekNumber, i) => <WeekTable
                            key={i}
                            weekNumber={weekNumber}
                            isCurrent={i === 0}
                        />)}
                </div>

                {this.currentWeek > 2 && <Button
                    className="show-all-button"
                    theme={Theme.ACCENT}
                    onClick={this.toggleShowAllWeeks}
                >
                    {lastVisibleWeekNumber === 1 ? 'Hide' : 'Load more...'}
                </Button>}
            </section>
        );
    }

    private toggleShowAllWeeks = () => {
        const { lastVisibleWeekNumber } = this.state;

        const newShowAllWeeks = lastVisibleWeekNumber === 1;
        this.setState({
            lastVisibleWeekNumber: newShowAllWeeks ? Math.max(1, this.currentWeek - 1) : 1
        });
    };
}

export const HoursPage = withAuthorization(connect(mapStateToProps, undefined)(HoursPageComponent));
