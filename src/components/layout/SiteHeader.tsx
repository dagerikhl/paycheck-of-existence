import * as React from 'react';

import { SiteNavigation } from './SiteNavigation';

import logo from '../../images/logo.svg';

import './SiteHeader.css';

interface OwnProps {
    title: string;
}

export const SiteHeader: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-header">
        <div className="title">
            <img className="logo" src={logo} alt="Logo"/>
            <h1>{props.title}</h1>
        </div>

        <div className="site-navigation-container">
            <SiteNavigation/>
        </div>
    </div>
);
