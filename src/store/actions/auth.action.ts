import { AuthUser } from '../../constants/interfaces/AuthUser';

export interface UpdateAuthUser {
    type: string;
    authUser: AuthUser;
}

export type AuthAction =
    | UpdateAuthUser;

export const updateAuthUserAction = (authUser: AuthUser): UpdateAuthUser => ({
    type: 'UPDATE_AUTH_USER',
    authUser
});
