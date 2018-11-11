import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Card } from '../../../components/Card';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { DATE_LONG, DATE_WITH_YEAR, Day, InputCellType, TableCell, Week, Weeks } from '../../../constants';
import {
    createArrayFromRange,
    createDispatchToPropsFunction,
    getCurrentWeekdayDate,
    objectKeys,
    toHourFormat
} from '../../../helpers';
import { database } from '../../../services';
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
    error?: any;
}

interface StateProps {
    year: number;
    initialWeeks: Weeks;
    weeks: Weeks;
}

const mapStateToProps = (state: State): StateProps => ({
    year: state.period.year,
    initialWeeks: state.hours.initialWeeks,
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
    private readonly columnClassNames = ['date', 'hours-no', 'ss-no', 'hours-go', 'ss-go', 'overtime', undefined];
    private readonly rowClassNames = [undefined, undefined, undefined, undefined, undefined, 'weekend', 'weekend'];

    public state: OwnState = { isDirty: false };

    public componentDidMount() {
        const { weekNumber, updateWeek } = this.props;

        const week = this.getWeek();
        if (!week) {
            updateWeek(weekNumber, this.populateEmptyWeek());
        }
    }

    public render() {
        const { weekNumber, isCurrent, year } = this.props;
        const { error, isDirty } = this.state;

        const week = this.getWeek();
        if (!week) {
            return null;
        }

        const from = moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
        const to = from.clone().endOf('isoWeek');

        const displayRows: TableCell[][] = week.days.map((day, dayIndex) => {
            const date = getCurrentWeekdayDate(year, weekNumber, dayIndex);
            const dateCell = <div className="current-date">
                {date.isSame(moment(), 'date') && <div className="current-date-indicator">></div>}
                {date.format(DATE_LONG)}
            </div>;

            return [
                dateCell,
                this.createInputCell(dayIndex, 'hoursNo', InputCellType.NUMBER),
                this.createInputCell(dayIndex, 'ssNo', InputCellType.NUMBER),
                this.createInputCell(dayIndex, 'hoursGo', InputCellType.NUMBER),
                this.createInputCell(dayIndex, 'ssGo', InputCellType.NUMBER),
                this.createInputCell(dayIndex, 'overtime', InputCellType.NUMBER),
                this.createInputCell(dayIndex, 'notes', InputCellType.TEXT)
            ];
        });

        const footer = week.days
            .reduce((result: number[], day) => [
                undefined,
                result[1] + day.hoursNo,
                result[2] + day.ssNo,
                result[3] + day.hoursGo,
                result[4] + day.ssGo,
                result[5] + day.overtime,
                undefined
            ], [undefined, 0, 0, 0, 0, 0, undefined])
            .map((value) => value !== undefined ? toHourFormat(value) : undefined);

        return (
            <React.Fragment>
                <Card className="week-table" level={isCurrent ? 3 : 1}>
                    <h1 className="title">
                        <span>Week {weekNumber}</span>
                        <span className="dates">{from.format(DATE_WITH_YEAR)} &ndash; {to.format(DATE_WITH_YEAR)}</span>
                    </h1>

                    <Table
                        className="table"
                        columns={this.columns}
                        columnClassNames={this.columnClassNames}
                        rows={displayRows}
                        rowClassNames={this.rowClassNames}
                        footer={footer}
                    />

                    {error && <ErrorMessage message={error.message}/>}
                </Card>

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
        const { year, weekNumber } = this.props;

        const week = this.getWeek();
        week.days.forEach((day) => delete day.isDirty);

        database.hoursRef.child(year.toString()).child(weekNumber.toString()).update(week)
            .then(() => {
                this.setState({ error: undefined, isDirty: false });
            })
            .catch((error) => {
                this.setState({ error });
            });
    };

    private discardChanges = () => {
        const { year, weekNumber, updateWeek } = this.props;

        this.setState({ error: undefined, isDirty: false });

        database.hoursRef.child(year.toString()).child(weekNumber.toString()).once('value')
            .then((snapshot) => {
                const week = (snapshot && snapshot.val()) || this.populateEmptyWeek();

                updateWeek(weekNumber, week);
            });
    };

    private onInputCellChange = (dayIndex: number, cellProperty: string) => (value: number | string) => {
        const { weekNumber, updateWeek } = this.props;

        const initialWeek = this.getInitialWeek();
        const week = this.getWeek();

        const oldValue = week.days[dayIndex][cellProperty];
        if (oldValue === value) {
            return;
        }

        // TODO Make sure this works because of mutability
        week.days[dayIndex][cellProperty] = value;

        // Set dirty status for day
        const dayProperties = objectKeys(week.days[dayIndex]).filter((property) => property !== 'isDirty');
        week.days[dayIndex].isDirty = dayProperties.some((property) => {
            const isNotInitial = initialWeek && initialWeek.days[dayIndex][property] !== week.days[dayIndex][property];
            const isStartValue = !initialWeek && !!week.days[dayIndex][property];

            return isNotInitial || isStartValue;
        });

        // Update dirty status for week
        this.setState({ isDirty: week.days.some((day) => !!day.isDirty) });

        updateWeek(weekNumber, week);
    };

    private populateEmptyWeek = (): Week => ({ days: createArrayFromRange(0, 7).map(() => this.populateEmptyDay()) });

    private populateEmptyDay = (): Day => ({ hoursNo: 0, ssNo: 0, hoursGo: 0, ssGo: 0, overtime: 0, notes: '' });

    private createInputCell = (dayIndex: number, cellProperty: string, type: InputCellType) => {
        const week = this.getWeek();
        if (!week) {
            return undefined;
        }

        let validations = {};
        switch (type) {
            case InputCellType.NUMBER:
                validations = {
                    min: 0,
                    max: 24,
                    step: 0.5
                };

                break;
        }

        return <Input
            type={type}
            value={week.days[dayIndex][cellProperty]}
            onValueChange={this.onInputCellChange(dayIndex, cellProperty)}
            {...validations}
        />;
    };

    private getInitialWeek = () => this.props.initialWeeks[this.props.weekNumber];

    private getWeek = (props = this.props) => props.weeks[props.weekNumber];
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
