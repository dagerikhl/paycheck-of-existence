import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { AuthAction, updateAuthUser } from '../../actions/auth.action';
import { auth } from '../../auth/auth';
import { AuthUser } from '../../interfaces/AuthUser';
import { State } from '../../states/state';

interface StateProps {
    authUser: AuthUser | null;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser
});

interface DispatchProps {
    updateAuthUser: (authUser: AuthUser | null) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>): DispatchProps => bindActionCreators({
    updateAuthUser
}, dispatch);

type WithAuthProps = StateProps & DispatchProps & RouteComponentProps;

export const withAuth = (Component: React.ComponentClass) => {
    class WithAuth extends React.Component<WithAuthProps> {
        public componentDidMount() {
            auth.onAuthUserUpdate((authUser: AuthUser) => this.props.updateAuthUser(authUser));
        }

        public render() {
            return (
                <Component {...this.props}/>
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
};
