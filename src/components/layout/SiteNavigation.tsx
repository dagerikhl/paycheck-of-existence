import * as React from 'react';
import { connect } from 'react-redux';

import { AuthUser } from '../../constants/interfaces/AuthUser';
import { Routes } from '../../constants/routes';
import { auth } from '../../services/auth';
import { State } from '../../store/states/state';
import { Button } from '../Button';
import { Link } from '../Link';

import './SiteNavigation.css';

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

const authenticatedNavLinks = (<ul>
    <li><Link to={Routes.HOME}/></li>
    <li><Link to={Routes.HOURS}/></li>
    <li><Link to={Routes.SUMMARY}/></li>

    <li>
        <Button onClick={auth.logout}>
            <div className="logout-label">Logout</div>
        </Button>
    </li>
</ul>);

const notAuthenticatedNavLinks = (<ul>
    <li><Link to={Routes.HOME}/></li>
    <li><Link to={Routes.LOGIN}/></li>
</ul>);

const SiteNavigationComponent: React.SFC<StateProps> = (props: StateProps) => (
    <nav className="site-navigation">
        {props.authUser
            ? authenticatedNavLinks
            : notAuthenticatedNavLinks}
    </nav>
);

export const SiteNavigation = connect(mapStateToProps, undefined)(SiteNavigationComponent);
