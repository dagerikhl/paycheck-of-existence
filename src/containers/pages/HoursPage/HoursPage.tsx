import * as React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../../components/Button';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { withData } from '../../../components/higher-order/withData';
import { Theme } from '../../../constants';
import { createArrayFromRange, getNewestWeekNumberInYear  } from '../../../helpers';
import { State } from '../../../store/states';
import { WeekTable } from './WeekTable';

import './HoursPage.css';

interface OwnState {
    showAllWeeks: boolean;
}

interface StateProps {
    year: number;
}

const mapStateToProps = (state: State): StateProps => ({
    year: state.period.year
});

class HoursPageComponent extends React.PureComponent<StateProps, OwnState> {
    public state: OwnState = {
        showAllWeeks: false
    };

    public render() {
        const { year } = this.props;
        const { showAllWeeks } = this.state;

        const highestWeekNumberOfYear = getNewestWeekNumberInYear(year);

        const visibleWeekNumbers = createArrayFromRange(1, highestWeekNumberOfYear)
            .reverse()
            .slice(0, showAllWeeks ? undefined : 2);

        return (
            <section className="hours-page">
                <div className="weeks">
                    {visibleWeekNumbers
                        .map((weekNumber, i) => <WeekTable
                            key={i}
                            weekNumber={weekNumber}
                            isCurrent={i === 0}
                        />)}
                </div>

                {highestWeekNumberOfYear > 2 && <Button
                    className="show-all-button"
                    theme={Theme.ACCENT}
                    onClick={this.toggleShowAllWeeks}
                >
                    {showAllWeeks ? 'Hide early weeks' : 'Show all weeks'}
                </Button>}
            </section>
        );
    }

    private toggleShowAllWeeks = () => {
        const { showAllWeeks } = this.state;

        this.setState({ showAllWeeks: !showAllWeeks });
    };
}

export const HoursPage = withAuthorization(withData('weeks')(connect(mapStateToProps, undefined)(HoursPageComponent)));
