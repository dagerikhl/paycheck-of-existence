import * as React from 'react';

import logo from '../images/logo.svg';

import './SiteHeader.css';

interface OwnProps {
    title: string;
}

const SiteHeaderComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-header">
        <div className="title">
            <img className="logo" src={logo}/>
            <span className="label">{props.title}</span>
        </div>

        {/* TODO Add <PeriodPicker/> */}

        {/* TODO Add <SiteNavigation/> */}
    </div>
);

export const SiteHeader = SiteHeaderComponent;
