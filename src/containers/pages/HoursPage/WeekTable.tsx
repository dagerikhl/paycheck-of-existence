import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Table } from '../../../components/Table';
import { DATE_LONG, DATE_WITH_YEAR, Day, TableCell, Weeks } from '../../../constants';
import { createArrayFromRange, createDispatchToPropsFunction } from '../../../helpers';
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
    rows: TableCell[][];
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
    updateWeek: (weekNumber: number, week: Day[]) => void;
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
        isDirty: false,
        rows: WeekTableComponent.createWeekRows(
            this.props.year,
            this.props.weekNumber,
            this.props.weeks[this.props.weekNumber])
    };

    public render() {
        const { weekNumber, isCurrent, year } = this.props;
        const { isDirty, rows } = this.state;

        const from = moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
        const to = from.clone().endOf('isoWeek');

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

    private static createWeekRows = (year: number, weekNumber: number, week?: Day[]) => {
        const populatedWeek = week || WeekTableComponent.populateEmptyWeek();

        return populatedWeek.map((day, i) => WeekTableComponent.createDayRow(year, weekNumber, day, i));
    };

    private static createDayRow = (year: number, weekNumber: number, day: Day, i: number) => {
        const date = moment().year(year).isoWeek(weekNumber).isoWeekday(i + 1).format(DATE_LONG);

        return [date, day.hoursNo, day.ssNo, day.hoursGo, day.ssGo, day.overtime, day.notes];
    };

    private static populateEmptyWeek = (): Day[] =>
        createArrayFromRange(0, 7).map(() => WeekTableComponent.populateEmptyDay());

    private static populateEmptyDay = (): Day => ({ hoursNo: 0, ssNo: 0, hoursGo: 0, ssGo: 0, overtime: 0, notes: '' });
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
