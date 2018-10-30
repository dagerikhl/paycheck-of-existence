import * as moment from 'moment';
import * as React from 'react';

import { Button } from '../../../components/Button';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { createArrayFromRange } from '../../../helpers/number-helper';
import { DataControls } from './DataControls';
import { WeekTable } from './WeekTable';

import './HoursPage.css';

interface OwnState {
    isDirty: boolean;
}

class HoursPageComponent extends React.PureComponent<OwnState> {
    public state: OwnState = {
        isDirty: false
    };

    private weeks = createArrayFromRange(0, moment().isoWeek()).reverse();

    public componentDidMount() {
        // TODO Start loading documents from the database
    }

    public render() {
        const { isDirty } = this.state;

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
                    {this.weeks.map((weekNumber, i) => <WeekTable
                        key={i}
                        weekNumber={weekNumber}
                        isCurrent={i === 0}
                    />)}
                </div>
            </section>
        );
    }

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

export const HoursPage = withAuthorization(HoursPageComponent);
