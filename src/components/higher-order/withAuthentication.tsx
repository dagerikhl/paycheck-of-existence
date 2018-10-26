import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { AuthUser } from '../../constants/interfaces/AuthUser';
import { auth } from '../../services/auth';
import { AuthAction, updateAuthUserAction } from '../../store/actions/auth.action';

interface OwnState {
    isLoaded: boolean;
}

interface DispatchProps {
    updateAuthUser: (authUser: AuthUser | null) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>): DispatchProps => bindActionCreators({
    updateAuthUser: updateAuthUserAction
}, dispatch);

export type WithAuthenticationProps = DispatchProps & RouteComponentProps;

export const withAuthentication = (Component: React.ComponentType) => {
    class WithAuthentication extends React.Component<WithAuthenticationProps, OwnState> {
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

    return connect(undefined, mapDispatchToProps)(WithAuthentication);
};
