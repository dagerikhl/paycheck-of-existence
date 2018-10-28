import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Theme } from '../../constants/enums/Theme';
import { RouteRef } from '../../constants/routes';

import './Link.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    routeRef: RouteRef;
}

const RouteLinkComponent: React.SFC<OwnProps> = ({ className, theme, routeRef }) => (
    <NavLink
        className={`${className} link ${theme || Theme.NEUTRAL}`}
        activeClassName="active"
        to={routeRef.path}
        exact
    >
        {routeRef.name}
    </NavLink>
);

export const RouteLink = RouteLinkComponent;
