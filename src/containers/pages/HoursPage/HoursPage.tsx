import * as React from 'react';

import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { withData } from '../../../components/higher-order/withData';
import { WeekTable } from './WeekTable';

import './HoursPage.css';

class HoursPageComponent extends React.PureComponent {
    public render() {
        return (
            <section className="hours-page">
                <div className="weeks">
                    <WeekTable/>
                </div>
            </section>
        );
    }
}

export const HoursPage = withAuthorization(withData('days')(HoursPageComponent));
