import * as React from 'react';

import { withProjectsData } from '../../../components/higher-order/with-data/withProjectsData';
import { withWorkdaysInPeriodData } from '../../../components/higher-order/with-data/withWorkdaysInPeriodData';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';

import { WeekTable } from './WeekTable';

import './HoursPage.css';

const HoursPageComponent: React.SFC = () => {
    return (
        <section className="hours-page">
            <WeekTable/>
        </section>
    );
};

export const HoursPage = withAuthorization(withProjectsData(withWorkdaysInPeriodData(HoursPageComponent)));
