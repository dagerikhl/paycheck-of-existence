import * as classNames from 'classnames';
import * as React from 'react';

import { Button } from '../../../components/Button';

import './DataControls.css';

interface OwnProps {
    className?: string;
    label: string;
    saveLabel: string;
    cancelLabel: string;
    hide?: boolean;
    onSave: () => void;
    onCancel: () => void;
}

const DataControlsComponent: React.SFC<OwnProps> =
    ({ className, label, saveLabel, cancelLabel, hide, onSave, onCancel }) => (
        <div className={classNames({ [className as string]: className, 'data-controls': true, 'open': !hide })}>
            <h3>{label}</h3>

            <div className="control-buttons">
                <Button onClick={onSave} disabled={hide}>{saveLabel}</Button>
                <Button onClick={onCancel} disabled={hide}>{cancelLabel}</Button>
            </div>
        </div>
    );

export const DataControls = DataControlsComponent;
