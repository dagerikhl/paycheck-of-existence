import * as classNames from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { RouteRef, Theme } from '../../constants';

import './Link.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    routeRef: RouteRef;
}

export const RouteLink: React.SFC<OwnProps> = ({ className, theme, routeRef }) => (
    <NavLink
        className={classNames({ [className as string]: className, 'link': true, [theme || Theme.NEUTRAL]: true })}
        activeClassName="active"
        to={routeRef.path}
        exact
    >
        {routeRef.name}
    </NavLink>
);
