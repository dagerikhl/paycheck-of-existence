import { AuthUser } from '../../constants';

export interface AuthState {
    authUser: AuthUser | null;
}

export const initialAuthState: AuthState = {
    authUser: null
};
