import { AuthUser } from '../../types';

export interface AuthState {
    authUser: AuthUser | null;
}

export const initialAuthState: AuthState = {
    authUser: null
};
