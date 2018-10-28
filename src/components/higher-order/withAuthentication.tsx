import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { AuthUser } from '../../constants/interfaces/AuthUser';
import { createDispatchToPropsFunction } from '../../helpers/redux-helper';
import { auth } from '../../services/auth';
import { updateAuthUserAction } from '../../store/actions/auth.action';
import { Loader } from '../Loader';

interface OwnState {
    isLoaded: boolean;
}

interface DispatchProps {
    updateAuthUser: (authUser: AuthUser | null) => void;
}

const mapDispatchToProps = createDispatchToPropsFunction({
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
                : <Loader/>;
        }
    }

    return connect(undefined, mapDispatchToProps)(WithAuthentication);
};
