import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { DATE_LONG, DATE_WITH_YEAR, Day, TableCell, Weeks } from '../../../constants';
import { createArrayFromRange, createDispatchToPropsFunction } from '../../../helpers';
import { updateWeekAction } from '../../../store/actions';
import { State } from '../../../store/states';
import { DataControls } from './DataControls';

import './WeekTable.css';

enum InputCellType {
    NUMBER = 'number',
    TEXT = 'text'
}

interface OwnProps {
    weekNumber: number;
    isCurrent?: boolean;
}

interface OwnState {
    isDirty: boolean;
    rows?: TableCell[][];
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
        isDirty: false
    };

    public componentDidMount() {
        const { weekNumber, weeks } = this.props;

        const rows = this.createWeekRows(weeks[weekNumber]);
        this.setState({ rows });
    }

    public render() {
        const { weekNumber, isCurrent, year } = this.props;
        const { isDirty, rows } = this.state;

        if (!rows) {
            return null;
        }

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

    private onInputCellChange = (weekIndex: number, dayIndex: number, type: InputCellType, value: number) =>
        (event: React.FormEvent<HTMLInputElement>) => {
            const newValue = +event.currentTarget.value;

            const { rows } = this.state;

            if (newValue !== value && rows) {
                rows[weekIndex][dayIndex] = this.createInputCell(weekIndex, dayIndex, type, newValue);

                this.setState({ isDirty: true, rows });
            }
        };

    private createWeekRows = (week?: Day[]) => {
        const populatedWeek = week || this.populateEmptyWeek();

        return populatedWeek.map((day, i) => {
            const dayRow = this.createDayRow(day, i);

            return [
                dayRow[0],
                ...dayRow.splice(1, 5).map((value, j) => this.createInputCell(i, j + 1, InputCellType.NUMBER, value)),
                this.createInputCell(i, 6, InputCellType.TEXT, dayRow[6])
            ];
        });
    };

    private createDayRow = (day: any, i: number) => {
        const { year, weekNumber } = this.props;

        const date = moment().year(year).isoWeek(weekNumber).isoWeekday(i + 1).format(DATE_LONG);

        return [date, day.hoursNo, day.ssNo, day.hoursGo, day.ssGo, day.overtime, day.notes];
    };

    private populateEmptyWeek = (): Day[] => createArrayFromRange(0, 7).map(() => this.populateEmptyDay());

    private populateEmptyDay = (): Day => ({ hoursNo: 0, ssNo: 0, hoursGo: 0, ssGo: 0, overtime: 0, notes: '' });

    private createInputCell = (weekIndex: number, dayIndex: number, type: InputCellType, value: number) => {
        switch (type) {
            case 'number':
                const defaultValue = value || 0;

                return <Input
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    defaultValue={`${defaultValue}`}
                    onChange={this.onInputCellChange(weekIndex, dayIndex, type, defaultValue)}
                />;
            default:
                return <Input
                    type="text"
                />;
        }
    };
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
