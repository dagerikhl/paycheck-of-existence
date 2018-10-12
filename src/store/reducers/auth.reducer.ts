import { AuthAction } from '../actions/auth.action';
import { AuthState, initialAuthState } from '../states/auth.state';

export const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'UPDATE_AUTH_USER':
            return {
                authUser: action.authUser
            };
        default:
            return state;
    }
};
