import { AuthUser } from '../../interfaces';

export interface AuthState {
    authUser: AuthUser | null;
}

export const initialAuthState: AuthState = {
    authUser: null
};
