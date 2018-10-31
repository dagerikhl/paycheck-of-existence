import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../../components/Button';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { Theme } from '../../../constants/enums/Theme';
import { Weeks } from '../../../constants/interfaces/Weeks';
import { createArrayFromRange } from '../../../helpers/number-helper';
import { createDispatchToPropsFunction } from '../../../helpers/redux-helper';
import { updateAllWeeksAction } from '../../../store/actions/hours.action';
import { State } from '../../../store/states/state';
import { DataControls } from './DataControls';
import { WeekTable } from './WeekTable';

import './HoursPage.css';

interface OwnState {
    lastVisibleWeekNumber: number;
    isDirty: boolean;
}

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

type HoursPageProps = StateProps & DispatchProps;

class HoursPageComponent extends React.PureComponent<HoursPageProps, OwnState> {
    private readonly currentWeek = moment().isoWeek();

    private weeks = createArrayFromRange(0, moment().isoWeek()).reverse();

    public state: OwnState = {
        lastVisibleWeekNumber: Math.max(1, this.currentWeek - 1),
        isDirty: false
    };

    public componentDidMount() {
        // TODO Start loading documents from the database
    }

    public render() {
        const { lastVisibleWeekNumber, isDirty } = this.state;

        return (
            <section className="hours-page">
                <DataControls
                    className="controls"
                    label="You have unsaved changes."
                    saveLabel="Save all"
                    cancelLabel="Discard all"
                    onSave={this.saveAllChanges}
                    onCancel={this.discardAllChanges}
                    hide={!isDirty}
                />

                {/* TODO Remove */}
                <Button onClick={this.toggleControls}>Toggle dirty</Button>

                <div className="weeks">
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

    // TODO Remove
    private toggleControls = () => {
        this.setState({ isDirty: !this.state.isDirty });
    };

    private saveAllChanges = () => {
        // TODO Save changes to database
    };

    private discardAllChanges = () => {
        // TODO Reset all weektables to data from database
    };
}

export const HoursPage = withAuthorization(connect(mapStateToProps, mapDispatchToProps)(HoursPageComponent));
