import * as moment from 'moment';
import * as React from 'react';

import { Button } from '../../../components/Button';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { createArrayFromRange } from '../../../helpers/number-helper';
import { DataControls } from './DataControls';

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
                    className="data-controls"
                    label="You have unsaved changes."
                    saveLabel="Save all"
                    cancelLabel="Discard all"
                    onSave={this.saveChanges}
                    onCancel={this.discardChanges}
                    hide={!isDirty}
                />

                {/* TODO Remove */}
                <Button onClick={this.toggleControls}>Toggle dirty</Button>

                <div className="weeks">
                    {this.weeks.map((weekNumber, i) => <div
                        key={i}
                        style={{ border: '1px solid black', marginBottom: 8, background: i === 0 ? 'hotpink' : '' }}
                    >
                        TODO WEEKTABLE: {weekNumber}
                    </div>)}
                </div>
            </section>
        );
    }

    // TODO Remove
    private toggleControls = () => {
        this.setState({ isDirty: !this.state.isDirty });
    };

    private saveChanges = () => {
        // TODO Save changes to database
    };

    private discardChanges = () => {
        // TODO Reset all weektables to data from database
    };
}

export const HoursPage = withAuthorization(HoursPageComponent);
