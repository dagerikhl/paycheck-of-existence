import * as React from 'react';
import { connect } from 'react-redux';

import { AuthUser } from '../../constants/interfaces/AuthUser';
import { Routes } from '../../constants/routes';
import { auth } from '../../services/auth';
import { State } from '../../store/states/state';
import { Button } from '../Button';
import { RouteLink } from '../links/RouteLink';

import './SiteNavigation.css';

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

const authenticatedNavLinks = (<ul>
    <li><RouteLink routeRef={Routes.HOME}/></li>
    <li><RouteLink routeRef={Routes.HOURS}/></li>
    <li><RouteLink routeRef={Routes.SUMMARY}/></li>

    <li>
        <Button onClick={auth.logout}>
            <div className="logout-label">Logout</div>
        </Button>
    </li>
</ul>);

const notAuthenticatedNavLinks = (<ul>
    <li><RouteLink routeRef={Routes.HOME}/></li>
    <li><RouteLink routeRef={Routes.LOGIN}/></li>
</ul>);

const SiteNavigationComponent: React.SFC<StateProps> = (props: StateProps) => (
    <nav className="site-navigation">
        {props.authUser
            ? authenticatedNavLinks
            : notAuthenticatedNavLinks}
    </nav>
);

export const SiteNavigation = connect(mapStateToProps, undefined)(SiteNavigationComponent);
