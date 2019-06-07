import { AuthUser } from '../../types';

export enum AuthActionType {
    UpdateAuthUser = 'AUTH/UPDATE_AUTH_USER'
}

export type AuthAction =
    | UpdateAuthUser;

export interface UpdateAuthUser {
    type: AuthActionType.UpdateAuthUser;
    authUser: AuthUser;
}

export const updateAuthUserAction = (authUser: AuthUser): UpdateAuthUser => ({
    type: AuthActionType.UpdateAuthUser,
    authUser
});
