import { AuthUser } from '../interfaces/AuthUser';

export interface AuthState {
    authUser: AuthUser | null;
}

export const initialAuthState: AuthState = {
    authUser: null
};
