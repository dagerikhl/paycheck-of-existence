import { List, Map } from 'immutable';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Card } from '../../../components/Card';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { DATE_FORMATS, WEEK_COLUMNS, WEEK_ROWS_CSS } from '../../../constants';
import { InputCellType } from '../../../enums';
import { getFirstDayOfWeek, getPeriodForWeek, mapDispatchProps, range, toHourFormat } from '../../../helpers';
import { Day } from '../../../interfaces';
import { database } from '../../../services';
import { updateDayAction, updateWeekAction } from '../../../store/actions';
import { getDaysInWeek, getInitialDaysInWeek, getUserId } from '../../../store/selectors';
import { State } from '../../../store/states';
import { TableCell } from '../../../types';
import { DataControls } from './DataControls';

import './WeekTable.css';

interface ViewState {
    isDirty: boolean;
}

interface OwnProps {
    weekNumber: number;
    isCurrent?: boolean;
}

interface OwnState {
    viewState: Map<string, Map<string, ViewState>>;
    error?: any;
}

interface StateProps {
    userId: string;
    year: number;
    week: Map<string, Day>;
    initialWeek: Map<string, Day>;
}

const mapStateToProps = (state: State, props: OwnProps): StateProps => ({
    userId: getUserId(state),
    year: state.period.year,
    week: getDaysInWeek(state, props.weekNumber),
    initialWeek: getInitialDaysInWeek(state, props.weekNumber)
});

interface DispatchProps {
    updateWeek: (week: Map<string, Day>) => void;
    updateDay: (dateString: string, day: Day) => void;
}

const mapDispatchToProps = mapDispatchProps({
    updateWeek: updateWeekAction,
    updateDay: updateDayAction
});

type WeekTableProps = OwnProps & StateProps & DispatchProps;

class WeekTableComponent extends React.PureComponent<WeekTableProps, OwnState> {
    public state: OwnState = {
        viewState: WeekTableComponent.populateViewState(getFirstDayOfWeek(this.props.year, this.props.weekNumber))
    };

    public componentDidMount() {
        this.checkAndPopulateWeek();
    }

    public componentDidUpdate(prevProps: WeekTableProps) {
        this.checkAndPopulateWeek();
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
            .sortBy((_, k) => moment(k, DATE_FORMATS.storage).valueOf())
            .forEach((day, dateString) => {
                const date = moment(dateString, DATE_FORMATS.storage);
                const dateIndicator = date.isSame(moment(), 'date') && '>';
                const dateCell = date.format(DATE_FORMATS.long);

                displayRows[i] = [
                    dateIndicator,
                    dateCell,
                    this.createInputCell(dateString, 'hoursNo', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'ssNo', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'hoursO', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'ssO', InputCellType.NUMBER),
                    this.createInputCell(dateString, 'ot', InputCellType.NUMBER),
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
                result[4] + day.hoursO,
                result[5] + day.ssO,
                result[6] + day.ot,
                undefined
            ], [undefined, undefined, 0, 0, 0, 0, 0, undefined])
            .map((value) => value !== undefined ? toHourFormat(value) : undefined);

        return (
            <React.Fragment>
                <Card className="week-table" level={isCurrent ? 3 : 1}>
                    <h1 className="title">
                        <span>Week {weekNumber}</span>

                        <span className="dates">
                            {period.from.format(DATE_FORMATS.withYear)}
                            &ndash;
                            {period.to.format(DATE_FORMATS.withYear)}
                        </span>
                    </h1>

                    <Table
                        className="table"
                        columns={WEEK_COLUMNS.headers}
                        columnClassNames={WEEK_COLUMNS.classNames}
                        rows={displayRows}
                        rowClassNames={WEEK_ROWS_CSS}
                        footer={footer}
                    />

                    {error && <ErrorMessage message={error.message}/>}
                </Card>

                <DataControls
                    label={`You have unsaved changes in week ${weekNumber}.`}
                    saveLabel="Save"
                    cancelLabel="Discard"
                    onSave={this.onSaveChanges}
                    onCancel={this.onDiscardChanges}
                    hide={!this.checkDirtyFlags()}
                />
            </React.Fragment>
        );
    }

    private onSaveChanges = () => {
        const { userId, year, week } = this.props;

        let possibleError: any;

        week.forEach((day, dateString) => {
            database.getUserRef(userId).child('hours').child(year.toString()).child(dateString).update(day)
                .catch((error) => {
                    possibleError = error;
                });
        });

        if (possibleError) {
            this.setState({ error: possibleError });
        } else {
            this.resetState();
        }
    };

    private onDiscardChanges = () => {
        const { initialWeek, updateWeek, updateDay } = this.props;

        if (initialWeek.isEmpty()) {
            updateWeek(this.populateEmptyWeek());
        } else {
            initialWeek.forEach((day, dateString) => {
                updateDay(dateString, day);
            });
        }

        this.resetState();
    };

    private resetState = () => {
        const { weekNumber, year } = this.props;

        this.setState({
            viewState: WeekTableComponent.populateViewState(getFirstDayOfWeek(year, weekNumber)),
            error: undefined
        });
    };

    private onInputCellChange = (dateString: string, cellProperty: string) => (value: number | string) => {
        const { updateDay } = this.props;

        const day = this.getDay(dateString);

        if (!day || (day && day[cellProperty] === value)) {
            return;
        }

        const newDay = { ...day, [cellProperty]: value };

        this.updateDirtyFlag(dateString, cellProperty, value);
        updateDay(dateString, newDay);
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

    private checkAndPopulateWeek = () => {
        const { week, updateWeek } = this.props;

        if (week.isEmpty()) {
            updateWeek(this.populateEmptyWeek());
        }
    };

    private populateEmptyWeek = (): Map<string, Day> => {
        const { weekNumber, year } = this.props;

        const period = getPeriodForWeek(year, weekNumber);

        let days = Map<string, Day>();
        for (let i = 0; i < 7; i++) {
            const dateString = period.from.clone().add(i, 'day').format(DATE_FORMATS.storage);

            days = days.set(dateString, this.populateEmptyDay());
        }

        return days;
    };

    private populateEmptyDay = (): Day => ({ hoursNo: 0, ssNo: 0, hoursO: 0, ssO: 0, ot: 0, notes: '' });

    private updateDirtyFlag = (dateString: string, cellProperty: string, value: number | string) => {
        const { initialWeek } = this.props;
        const { viewState } = this.state;

        const initialDay = initialWeek.get(dateString);
        const initialValue = initialDay && initialDay[cellProperty];
        const hasInitialValue = !!initialValue;

        const isDirty = (!hasInitialValue && !!value) || (hasInitialValue && value !== initialValue);

        this.setState({
            viewState: viewState.setIn(
                [dateString, cellProperty],
                { ...viewState.getIn([dateString, cellProperty]), isDirty }
            )
        });
    };

    private checkDirtyFlags = () => {
        const { viewState } = this.state;

        const dirtyFlags: List<boolean> = viewState.map((cells) => cells.map((cell) => cell.isDirty))
            .toList().flatten().toList();

        return dirtyFlags.some((dirtyFlag) => dirtyFlag);
    };

    private getDay = (dateString: string): Day | undefined => this.props.week.get(dateString);

    private static populateViewState = (firstDate: moment.Moment): Map<string, Map<string, ViewState>> => {
        const cells = Map(WEEK_COLUMNS.headers.map((header): [string, ViewState] => {
            return [header || '', { isDirty: false }];
        }));

        return Map(range(0, 7).map((i): [string, Map<string, ViewState>] => {
            return [firstDate.clone().add(i, 'day').format(DATE_FORMATS.storage), cells];
        }));
    };
}

export const WeekTable = connect(mapStateToProps, mapDispatchToProps)(WeekTableComponent);
