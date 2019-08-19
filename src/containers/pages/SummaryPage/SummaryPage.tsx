import * as React from 'react';

import { withProjectsData } from '../../../components/higher-order/with-data/withProjectsData';
import { withWorkdaysData } from '../../../components/higher-order/with-data/withWorkdaysData';
import { withAuthorization } from '../../../components/higher-order/withAuthorization';

import { SummaryTable } from './SummaryTable';

import './SummaryPage.css';

const SummaryPageComponent: React.SFC = () => {
    return (
        <section className="summary-page">
            <SummaryTable/>
        </section>
    );
};

export const SummaryPage = withAuthorization(withProjectsData(withWorkdaysData(SummaryPageComponent)));
