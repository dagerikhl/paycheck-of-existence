import { Map } from 'immutable';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Card } from '../../../components/Card';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { DATE_LONG, DATE_STORAGE, DATE_WITH_YEAR, Day, InputCellType, TableCell } from '../../../constants';
import { createDispatchToPropsFunction, getPeriodForWeek, toHourFormat } from '../../../helpers';
import { database } from '../../../services';
import { updateDayAction, updateWeekAction } from '../../../store/actions';
import { getDaysInWeek, getInitialDaysInWeek } from '../../../store/selectors';
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
    week: Map<string, Day>;
    initialWeek: Map<string, Day>;
}

const mapStateToProps = (state: State, props: OwnProps): StateProps => ({
    year: state.period.year,
    week: getDaysInWeek(state, props.weekNumber),
    initialWeek: getInitialDaysInWeek(state, props.weekNumber)
});

interface DispatchProps {
    updateWeek: (week: Map<string, Day>) => void;
    updateDay: (dateString: string, day: Day) => void;
}

const mapDispatchToProps = createDispatchToPropsFunction({
    updateWeek: updateWeekAction,
    updateDay: updateDayAction
});

type WeekTableProps = OwnProps & StateProps & DispatchProps;

class WeekTableComponent extends React.PureComponent<WeekTableProps, OwnState> {
    private readonly columns = [undefined, 'Date', 'Hours NO', 'SS NO', 'Hours GO', 'SS GO', 'Overtime', 'Notes'];
    private readonly columnClassNames = ['date-indicator', 'date', 'hours-no', 'ss-no', 'hours-go', 'ss-go', 'overtime',
        undefined];
    private readonly rowClassNames = [undefined, undefined, undefined, undefined, undefined, 'weekend', 'weekend'];

    public state: OwnState = { isDirty: false };

    public componentDidMount() {
        const { week, updateWeek } = this.props;

        if (week.isEmpty()) {
            updateWeek(this.populateEmptyWeek());
        }
    }

    public render() {
        const { weekNumber, isCurrent, year, week } = this.props;
        const { error } = this.state;

        if (week.isEmpty()) {
            return null;
        }

        const period = getPeriodForWeek(year, weekNumber);

        const displayRows: TableCell[][] = [];

        let i = 0;
        week
            .toOrderedMap()
            .sortBy((_, k) => moment(k, DATE_STORAGE).valueOf())
            .forEach((day, dateString) => {
                const date = moment(dateString, DATE_STORAGE);
                const dateIndicator = date.isSame(moment(), 'date') && '>';
                const dateCell = date.format(DATE_LONG);

                displayRows[i] = [
                    dateIndicator,
                    dateCell,
                    this.createInputCell(dateString, 'hoursNo', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'ssNo', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'hoursGo', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'ssGo', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'overtime', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'notes', InputCellType.TEXT)
                ];

                i++;
            });

        const footer = week
            .reduce((result: number[], day) => [
                undefined,
                undefined,
                result[2] + day.hoursNo,
                result[3] + day.ssNo,
                result[4] + day.hoursGo,
                result[5] + day.ssGo,
                result[6] + day.overtime,
                undefined
            ], [undefined, undefined, 0, 0, 0, 0, 0, undefined])
            .map((value) => value !== undefined ? toHourFormat(value) : undefined);

        return (
            <React.Fragment>
                <Card className="week-table" level={isCurrent ? 3 : 1}>
                    <h1 className="title">
                        <span>Week {weekNumber}</span>

                        <span className="dates">
                            {period.from.format(DATE_WITH_YEAR)} &ndash; {period.to.format(DATE_WITH_YEAR)}
                        </span>
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
                    // TODO Re-enable when dirty flag is set properly
                    // hide={!isDirty}
                />
            </React.Fragment>
        );
    }

    private saveChanges = () => {
        const { year, week } = this.props;

        let possibleError: any;

        week.forEach((day, dateString) => {
            const dayData = { ...day };
            delete dayData.isDirty;

            database.hoursRef.child(year.toString()).child(dateString).update(dayData)
                .catch((error) => {
                    possibleError = error;
                });
        });

        if (possibleError) {
            this.setState({ error: possibleError });
        } else {
            this.setState({ error: undefined, isDirty: false });
        }
    };

    private discardChanges = () => {
        const { initialWeek, updateWeek, updateDay } = this.props;

        if (initialWeek.isEmpty()) {
            updateWeek(this.populateEmptyWeek());
        } else {
            initialWeek.forEach((day, dateString) => {
                updateDay(dateString, day);
            });
        }

        this.setState({ error: undefined, isDirty: false });
    };

    private onInputCellChange = (dateString: string, cellProperty: string) => (value: number | string) => {
        const { updateDay } = this.props;

        const day = this.getDay(dateString);

        if (!day || (day && day[cellProperty] === value)) {
            return;
        }

        // Create clone of old day
        const dayClone = {
            ...day,
            [cellProperty]: value
        };
        delete dayClone.isDirty;

        // TODO Set dirty status for day

        updateDay(dateString, dayClone);
    };

    private createInputCell = (dateString: string, cellProperty: string, type: InputCellType) => {
        const day = this.getDay(dateString);

        if (!day) {
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
            value={day[cellProperty]}
            onValueChange={this.onInputCellChange(dateString, cellProperty)}
            {...validations}
        />;
    };

    private populateEmptyWeek = (): Map<string, Day> => {
        const { weekNumber, year } = this.props;

        const period = getPeriodForWeek(year, weekNumber);

        let days = Map<string, Day>();
        for (let i = 0; i < 7; i++) {
            const dateString = period.from.clone().add(i, 'day').format(DATE_STORAGE);

            days = days.set(dateString, this.populateEmptyDay());
        }

        return days;
    };

    private populateEmptyDay = (): Day => ({ hoursNo: 0, ssNo: 0, hoursGo: 0, ssGo: 0, overtime: 0, notes: '' });

    private getDay = (dateString: string): Day | undefined => this.props.week.get(dateString);
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
