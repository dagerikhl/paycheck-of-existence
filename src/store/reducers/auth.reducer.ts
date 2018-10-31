import { AuthAction, AuthActionType } from '../actions';
import { AuthState, initialAuthState } from '../states';

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
