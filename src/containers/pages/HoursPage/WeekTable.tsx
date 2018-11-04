import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Table } from '../../../components/Table';
import { DATE_WITH_YEAR, Week, Weeks } from '../../../constants';
import { createDispatchToPropsFunction, objectKeys, objectValues } from '../../../helpers';
import { updateWeekAction } from '../../../store/actions';
import { State } from '../../../store/states';
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
    weeks: Weeks;
}

const mapStateToProps = (state: State): StateProps => ({
    year: state.period.year,
    weeks: state.hours.weeks
});

interface DispatchProps {
    updateWeek: (weekNumber: number, week: Week) => void;
}

const mapDispatchToProps = createDispatchToPropsFunction({
    updateWeek: updateWeekAction
});

type WeekTableProps = OwnProps & StateProps & DispatchProps;

class WeekTableComponent extends React.PureComponent<WeekTableProps, OwnState> {
    private readonly columns = ['Date', 'Hours NO', 'SS NO', 'Hours GO', 'SS GO', 'Overtime', 'Notes'];
    private readonly columnClassNames = ['date', 'hours-no', 'ss-no', 'hours-go', 'ss-go', 'overtime', 'notes'];

    private footer = [undefined, 0, 0, 0, 0, 0, undefined];

    public state: OwnState = {
        isDirty: false
    };

    public render() {
        const { weekNumber, isCurrent, year, weeks } = this.props;
        const { isDirty } = this.state;

        const from = moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
        const to = from.clone().endOf('isoWeek');

        const week = weeks[weekNumber];
        const rows = objectKeys(week).map((date) => objectValues(week[date]));

        return (
            <React.Fragment>
                <div className={`week-table ${isCurrent ? 'current' : ''}`}>
                    <h1 className="title">
                        <span>Week {weekNumber}</span>
                        <span className="dates">{from.format(DATE_WITH_YEAR)} &ndash; {to.format(DATE_WITH_YEAR)}</span>
                    </h1>

                    <Table
                        className="table"
                        columns={this.columns}
                        columnClassNames={this.columnClassNames}
                        rows={rows}
                        footer={this.footer}
                    />
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
