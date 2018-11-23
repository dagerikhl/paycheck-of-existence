import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { mapDispatchProps } from '../../helpers';
import { AuthUser } from '../../interfaces';
import { auth } from '../../services';
import { updateAuthUserAction } from '../../store/actions';
import { Loader } from '../Loader';

interface OwnState {
    isLoaded: boolean;
}

interface DispatchProps {
    updateAuthUser: (authUser: AuthUser | null) => void;
}

const mapDispatchToProps = mapDispatchProps({
    updateAuthUser: updateAuthUserAction
});

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
                : <Loader text="Authenticating user..."/>;
        }
    }

    return connect(undefined, mapDispatchToProps)(WithAuthentication);
};
