import * as classNames from 'classnames';
import * as React from 'react';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

import './DataControls.css';

interface OwnProps {
    className?: string;
    label?: string;
    saveLabel: string;
    cancelLabel: string;
    hide?: boolean;
    onSave: () => void;
    onCancel: () => void;
}

export class DataControls extends React.PureComponent<OwnProps> {
    public componentDidMount() {
        window.addEventListener('keydown', this.onKeyboardShortcut);
    }

    public componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyboardShortcut);
    }

    public render() {
        const { className, label, saveLabel, cancelLabel, hide, onSave, onCancel } = this.props;

        return (
            <Card
                className={classNames({ [className as string]: className, 'data-controls': true, 'open': !hide })}
                level={3}
            >
                <h2>{label}</h2>

                <div className="control-buttons">
                    <Button title="CTRL+S" onClick={onSave} disabled={hide}>{saveLabel}</Button>
                    <Button title="CTRL+D" onClick={onCancel} disabled={hide}>{cancelLabel}</Button>
                </div>
            </Card>
        );
    }

    private onKeyboardShortcut = (event: KeyboardEvent) => {
        const { onSave, onCancel } = this.props;

        if (event.ctrlKey && event.key === 's') {
            onSave();

            event.preventDefault();
        } else if (event.ctrlKey && event.key === 'd') {
            onCancel();

            event.preventDefault();
        }
    };
}
