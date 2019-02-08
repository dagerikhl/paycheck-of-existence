import * as classNames from 'classnames';
import * as React from 'react';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

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

export const DataControls: React.SFC<OwnProps> =
    ({ className, label, saveLabel, cancelLabel, hide, onSave, onCancel }) => (
        <Card
            className={classNames({ [className as string]: className, 'data-controls': true, 'open': !hide })}
            level={3}
        >
            <h2>{label}</h2>

            <div className="control-buttons">
                <Button onClick={onSave} disabled={hide}>{saveLabel}</Button>
                <Button onClick={onCancel} disabled={hide}>{cancelLabel}</Button>
            </div>
        </Card>
    );
