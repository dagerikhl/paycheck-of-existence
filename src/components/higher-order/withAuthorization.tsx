import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Routes } from '../../constants';
import { AuthUser } from '../../interfaces';
import { auth } from '../../services';
import { State } from '../../store/states';

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

export type WithAuthorizationProps = StateProps & RouteComponentProps;

export const withAuthorization = (Component: React.ComponentType) => {
    class WithAuthorization extends React.Component<WithAuthorizationProps> {
        public componentDidMount() {
            const { history } = this.props;

            auth.onAuthUserUpdate((authUser: AuthUser) => {
                if (!this.isAuthorized(authUser)) {
                    history.push(Routes.LOGIN.path);
                }
            });
        }

        public render() {
            const { authUser } = this.props;

            return authUser
                ? <Component {...this.props}/>
                : null;
        }

        private isAuthorized = (authUser: AuthUser) => {
            return !!authUser;
        };
    }

    return withRouter(connect(mapStateToProps)(WithAuthorization));
};
