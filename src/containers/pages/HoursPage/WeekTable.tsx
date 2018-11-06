import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { DATE_LONG, DATE_WITH_YEAR, Day, TableCell, Week, Weeks } from '../../../constants';
import {
    createArrayFromRange,
    createDispatchToPropsFunction,
    getCurrentWeekdayDate,
    objectKeys
} from '../../../helpers';
import { database } from '../../../services';
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

    public componentDidMount() {
        const { weekNumber, updateWeek } = this.props;

        const week = this.getWeek();
        if (!week) {
            updateWeek(weekNumber, this.populateEmptyWeek());
        }
    }

    public render() {
        const { weekNumber, isCurrent, year } = this.props;
        const { isDirty } = this.state;

        const week = this.getWeek();
        if (!week) {
            return null;
        }

        const from = moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
        const to = from.clone().endOf('isoWeek');

        const displayRows: TableCell[][] = week.days.map((day, dayIndex) => [
            getCurrentWeekdayDate(year, weekNumber, dayIndex).format(DATE_LONG),
            ...objectKeys(day).map((cellProperty) => {
                switch (cellProperty) {
                    case 'hoursNo':
                    case 'ssNo':
                    case 'hoursGo':
                    case 'ssGo':
                    case 'overtime':
                        return this.createInputCell(dayIndex, cellProperty, InputCellType.NUMBER);
                    case 'notes':
                    default:
                        return this.createInputCell(dayIndex, cellProperty, InputCellType.TEXT);
                }
            })]
        );

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
                        rows={displayRows}
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
        const { year, weekNumber, updateWeek } = this.props;

        this.setState({ isDirty: false });

        database.hoursRef.child(year.toString()).child(weekNumber.toString()).once('value')
            .then((snapshot) => {
                const week = (snapshot && snapshot.val()) || this.populateEmptyWeek();

                updateWeek(weekNumber, week);
            });
    };

    private onInputCellChange = (weekIndex: number, cellProperty: string, type: InputCellType) =>
        (event: React.FormEvent<HTMLInputElement>) => {
            const newValue = type === InputCellType.NUMBER ? +event.currentTarget.value : event.currentTarget.value;

            const { weekNumber, updateWeek } = this.props;

            const week = this.getWeek();

            const oldValue = week.days[weekIndex][cellProperty];

            if (newValue !== oldValue) {
                week.days[weekIndex][cellProperty] = newValue;

                this.setState({ isDirty: true });
                // TODO Make sure this works because of mutability
                updateWeek(weekNumber, week);
            }
        };

    private populateEmptyWeek = (): Week => ({ days: createArrayFromRange(0, 7).map(() => this.populateEmptyDay()) });

    private populateEmptyDay = (): Day => ({ hoursNo: 0, ssNo: 0, hoursGo: 0, ssGo: 0, overtime: 0, notes: '' });

    private createInputCell = (dayIndex: number, cellProperty: string, type: InputCellType) => {
        const week = this.getWeek();
        if (!week) {
            return undefined;
        }

        switch (type) {
            case 'number':
                return <Input
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={week.days[dayIndex][cellProperty]}
                    onChange={this.onInputCellChange(dayIndex, cellProperty, type)}
                />;
            default:
                return <Input
                    type="text"
                    value={week.days[dayIndex][cellProperty]}
                    onChange={this.onInputCellChange(dayIndex, cellProperty, type)}
                />;
        }
    };

    private getWeek = () => {
        const { weekNumber, weeks } = this.props;

        return weeks[weekNumber];
    };
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
