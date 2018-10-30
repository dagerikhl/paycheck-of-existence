import * as React from 'react';
import { connect } from 'react-redux';

import { createDispatchToPropsFunction } from '../../../helpers/redux-helper';
import { updatePeriodYearAction } from '../../../store/actions/period.action';
import { State } from '../../../store/states/state';
import { DataControls } from './DataControls';

import './WeekTable.css';

interface OwnProps {
    weekNumber: number;
    isCurrent?: boolean;
}

interface OwnState {
    isDirty: boolean;
}

interface StateProps {
    year: number;
}

const mapStateToProps = (state: State): StateProps => ({
    year: state.period.year
});

interface DispatchProps {
    saveWeekHours: (hours: any) => void;
}

const mapDispatchToProps = createDispatchToPropsFunction({
    // TODO Use proper action
    saveWeekHours: updatePeriodYearAction
});

type WeekTableProps = OwnProps & StateProps & DispatchProps;

class WeekTableComponent extends React.PureComponent<WeekTableProps, OwnState> {
    public state: OwnState = {
        isDirty: false
    };

    public render() {
        const { weekNumber, isCurrent } = this.props;
        const { isDirty } = this.state;

        return (
            <React.Fragment>
                <div className={`week-table ${isCurrent ? 'current' : ''}`}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Hours NO</th>
                                <th>SS NO</th>
                                <th>Hours GO</th>
                                <th>SS GO</th>
                                <th>Overtime</th>
                                <th>Notes</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>Hours NO</td>
                                <td>SS NO</td>
                                <td>Hours GO</td>
                                <td>SS GO</td>
                                <td>Overtime</td>
                                <td>Notes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <DataControls
                    label={`You have unsaved changes in week ${weekNumber}.`}
                    saveLabel="Save"
                    cancelLabel="Discard"
                    onSave={this.saveChanges}
                    onCancel={this.discardChanges}
                    hide={!isDirty}
                />
            </React.Fragment>
        );
    }

    private saveChanges = () => {
        // TODO Save changes to database
    };

    private discardChanges = () => {
        // TODO Reset weektable to data from database
    };
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
