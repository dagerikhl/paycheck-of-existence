import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { AuthAction, updateAuthUser } from '../../actions/auth.action';
import { auth } from '../../auth/auth';
import { AuthUser } from '../../interfaces/AuthUser';
import { State } from '../../states/state';

interface OwnState {
    isLoaded: boolean;
}

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
    class WithAuth extends React.Component<WithAuthProps, OwnState> {
        public state: OwnState = { isLoaded: false };

        public componentDidMount() {
            auth.onAuthUserUpdate((authUser: AuthUser) => {
                this.props.updateAuthUser(authUser);
                this.setState({ isLoaded: true });
            });
        }

        public render() {
            const { isLoaded } = this.state;

            return isLoaded
                ? <Component {...this.props}/>
                : <div>TODO Loading component</div>;
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
};
