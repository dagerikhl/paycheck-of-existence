import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Theme } from '../../constants/enums/Theme';
import { AuthUser } from '../../constants/interfaces/AuthUser';
import { Routes } from '../../constants/routes';
import { auth } from '../../services/auth';
import { State } from '../../store/states/state';
import { Button } from '../Button';

import './SiteNavigation.css';

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

const authenticatedNavLinks = (<ul>
    <li><Link className="g-link primary" to={Routes.HOME.path}>{Routes.HOME.name}</Link></li>
    <li><Link className="g-link primary" to={Routes.HOURS.path}>{Routes.HOURS.name}</Link></li>
    <li><Link className="g-link primary" to={Routes.SUMMARY.path}>{Routes.SUMMARY.name}</Link></li>

    <li><Button theme={Theme.PRIMARY} onClick={auth.logout}><div className="logout-label">Logout</div></Button></li>
</ul>);

const notAuthenticatedNavLinks = (<ul>
    <li><Link className="g-link primary" to={Routes.HOME.path}>{Routes.HOME.name}</Link></li>
    <li><Link className="g-link primary" to={Routes.LOGIN.path}>{Routes.LOGIN.name}</Link></li>
</ul>);

const SiteNavigationComponent: React.SFC<StateProps> = (props: StateProps) => (
    <nav className="site-navigation">
        {props.authUser
            ? authenticatedNavLinks
            : notAuthenticatedNavLinks}
    </nav>
);

export const SiteNavigation = connect(mapStateToProps, undefined)(SiteNavigationComponent);
