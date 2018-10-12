import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Routes } from '../../constants/routes';
import { AuthUser } from '../../interfaces/AuthUser';
import { auth } from '../../services/auth';
import { State } from '../../store/states/state';

interface OwnState {
    isLoaded: boolean;
}

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

type WithAuthorizationProps = StateProps & RouteComponentProps;

export const withAuthorization = (authCondition: (authUser: AuthUser) => boolean) => {
    return (Component: React.ComponentClass) => {
        class WithAuthorization extends React.Component<WithAuthorizationProps, OwnState> {
            public componentDidMount() {
                const { history } = this.props;

                auth.onAuthUserUpdate((authUser: AuthUser) => {
                    if (!authCondition(authUser)) {
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
        }

        return withRouter(connect(mapStateToProps)(WithAuthorization));
    };
};
