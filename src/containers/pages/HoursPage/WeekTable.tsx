import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { Input, Table } from '../../../components';
import { Week } from '../../../constants';
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
}

interface StateProps {
    year: number;
}

const mapStateToProps = (state: State): StateProps => ({
    year: state.period.year
});

interface DispatchProps {
    updateWeek: (weekNumber: number, week: Week) => void;
}

const mapDispatchToProps = createDispatchToPropsFunction({
    updateWeek: updateWeekAction
});

type WeekTableProps = OwnProps & StateProps & DispatchProps;

class WeekTableComponent extends React.PureComponent<WeekTableProps, OwnState> {
    private readonly numberOfColumns = 7;
    private readonly numberOfRows = 7;

    private readonly columns = ['Date', 'Hours NO', 'SS NO', 'Hours GO', 'SS GO', 'Overtime', 'Notes'];
    private readonly columnClassNames = ['date', 'hours-no', 'ss-no', 'hours-go', 'ss-go', 'overtime', 'notes'];

    public state: OwnState = {
        isDirty: false
    };

    // TODO Use proper rows with data for rows and footer
    private rows = createArrayFromRange(0, this.numberOfRows).map((_, i) => [
        moment().startOf('isoWeek').add(i, 'day').format('YYYY-MM-DD dddd'),
        ...createArrayFromRange(0, this.numberOfColumns - 2).map(() => <div key={0}><Input type="number"/></div>),
        'Noe som ligner på et litt stort prøvenotat.'
    ]);
    private footer = [0, 0, 0, 0, 0, 0, 0];

    public render() {
        const { weekNumber, isCurrent, year } = this.props;
        const { isDirty } = this.state;

        const from = moment().year(year).isoWeek(weekNumber).startOf('week');
        const to = from.clone().endOf('week');

        return (
            <React.Fragment>
                <div className={`week-table ${isCurrent ? 'current' : ''}`}>
                    <h1 className="title">
                        <span>Week {weekNumber}</span>
                        <span className="dates">{from.format('DD.MM')} &ndash; {to.format('DD.MM')}</span>
                    </h1>

                    <Table
                        className="table"
                        columns={this.columns}
                        columnClassNames={this.columnClassNames}
                        rows={this.rows}
                        footerCells={this.footer}
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
