import * as React from 'react';

import './SiteHeader.css';

interface OwnProps {
    title: string;
}

const SiteHeaderComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-header">
        <div className="title">
            {/* TODO Add logo <img/> */}
            <span className="text">{props.title}</span>
        </div>

        {/* TODO Add <PeriodPicker/> */}

        {/* TODO Add <SiteNavigation/> */}
    </div>
);

export const SiteHeader = SiteHeaderComponent;
