import * as React from 'react';
import { Link } from 'react-router-dom';

import { Theme } from '../../constants/enums/Theme';
import { RouteRef } from '../../constants/routes';

import './Link.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    routeRef: RouteRef;
}

const RouteLinkComponent: React.SFC<OwnProps> = ({ className, theme, routeRef }) => (
    <Link
        className={`${className} link ${theme || Theme.NEUTRAL}`}
        to={routeRef.path}
    >
        {routeRef.name}
    </Link>
);

export const RouteLink = RouteLinkComponent;
