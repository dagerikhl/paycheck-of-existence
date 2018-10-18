import * as React from 'react';

import { withAuthorization } from '../../components/higher-order/withAuthorization';

import './HoursPage.css';

class HoursPageComponent extends React.PureComponent {
    public render() {
        return (
            <section className="hours">
                <h1>Hours page</h1>
            </section>
        );
    }
}

export const HoursPage = withAuthorization(HoursPageComponent);
