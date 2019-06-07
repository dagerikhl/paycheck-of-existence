import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Routes } from '../../constants';
import { auth } from '../../services';
import { State } from '../../store/states';
import { AuthUser } from '../../types';
import { Button } from '../Button';
import { RouteLink } from '../links/RouteLink';

import './SiteNavigation.css';

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

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

type SiteNavigationProps = StateProps & RouteComponentProps;

const SiteNavigationComponent: React.SFC<SiteNavigationProps> = ({ authUser }) => (
    <nav className="site-navigation">
        {authUser
            ? authenticatedNavLinks
            : notAuthenticatedNavLinks}
    </nav>
);

export const SiteNavigation = withRouter(connect(mapStateToProps, undefined)(SiteNavigationComponent));
