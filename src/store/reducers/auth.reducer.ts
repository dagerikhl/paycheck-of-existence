import { AuthAction, AuthActionType } from '../actions/auth.action';
import { AuthState, initialAuthState } from '../states/auth.state';

export const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.UpdateAuthUser:
            return {
                ...state,
                authUser: action.authUser
            };
        default:
            return state;
    }
};
