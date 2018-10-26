import * as React from 'react';
import { connect } from 'react-redux';

import { Theme } from '../../constants/enums/Theme';
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
    <li><Link theme={Theme.PRIMARY} to={Routes.HOME}/></li>
    <li><Link theme={Theme.PRIMARY} to={Routes.HOURS}/></li>
    <li><Link theme={Theme.PRIMARY} to={Routes.SUMMARY}/></li>

    <li>
        <Button theme={Theme.PRIMARY} onClick={auth.logout}>
            <div className="logout-label">Logout</div>
        </Button>
    </li>
</ul>);

const notAuthenticatedNavLinks = (<ul>
    <li><Link theme={Theme.PRIMARY} to={Routes.HOME}/></li>
    <li><Link theme={Theme.PRIMARY} to={Routes.LOGIN}/></li>
</ul>);

const SiteNavigationComponent: React.SFC<StateProps> = (props: StateProps) => (
    <nav className="site-navigation">
        {props.authUser
            ? authenticatedNavLinks
            : notAuthenticatedNavLinks}
    </nav>
);

export const SiteNavigation = connect(mapStateToProps, undefined)(SiteNavigationComponent);
