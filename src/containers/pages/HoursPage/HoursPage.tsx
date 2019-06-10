import * as React from 'react';

import { withAuthorization } from '../../../components/higher-order/withAuthorization';
import { withData } from '../../../components/higher-order/withData';

import { WeekTable } from './WeekTable';

import './HoursPage.css';

const HoursPageComponent: React.SFC = () => {
    return (
        <section className="hours-page">
            <WeekTable/>
        </section>
    );
};

export const HoursPage = withAuthorization(withData('workdays')(HoursPageComponent));
