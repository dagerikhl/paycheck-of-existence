import * as React from 'react';
import { connect } from 'react-redux';

import { DATE_FORMATS } from '../../../../constants';
import { State } from '../../../../store/states';
import { Period } from '../../../../types';
import { PeriodControls } from '../../../period-picker/PeriodControls';
import { DataControls } from '../DataControls';

import './WeekTableHeader.css';

interface StateProps {
    period: Period;
}

const mapStateToProps = (state: State): StateProps => ({
    period: state.controls.period
});

interface OwnProps {
    isDirty?: boolean;
    onSaveChanges: () => void;
    onDiscardChanges: () => void;
}

type WeekTableHeaderProps = OwnProps & StateProps;

const WeekTableHeaderComponent: React.FC<WeekTableHeaderProps> = (
    {
        isDirty,
        onSaveChanges,
        onDiscardChanges,
        period
    }
) => {
    return (
        <div className="week-table-header">
            <h1>Week {period.from.isoWeek()}</h1>

            <h1 className="dates">
                <span>{period.from.format(DATE_FORMATS.longWithYear)}</span>
                <span>&nbsp;&ndash;&nbsp;</span>
                <span>{period.to.format(DATE_FORMATS.longWithYear)}</span>
            </h1>

            <div className="period-picker-container">
                <PeriodControls shouldPromptOnDirty={true} isDirty={isDirty}/>
            </div>

            <DataControls
                saveLabel="Save"
                cancelLabel="Discard"
                onSave={onSaveChanges}
                onCancel={onDiscardChanges}
                hide={!isDirty}
            />
        </div>
    );
};

export const WeekTableHeader = connect(mapStateToProps)(WeekTableHeaderComponent);
