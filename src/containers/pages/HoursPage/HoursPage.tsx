import * as React from 'react';

import { withProjectsData } from '../../../components/higher-order/with-data/withProjectsData';
import { withWorkdaysData } from '../../../components/higher-order/with-data/withWorkdaysData';
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

export const HoursPage = withAuthorization(withProjectsData(withWorkdaysData(HoursPageComponent)));
