import * as React from 'react';

import { PeriodPicker } from '../../containers/PeriodPicker';
import { SiteNavigation } from './SiteNavigation';

import logo from '../../images/logo.svg';

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

        <div className="period-picker-container">
            <PeriodPicker/>
        </div>

        <div className="site-navigation-container">
            <SiteNavigation/>
        </div>
    </div>
);

export const SiteHeader = SiteHeaderComponent;
