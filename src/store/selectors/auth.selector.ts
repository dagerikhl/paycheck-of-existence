import { State } from '../states';

export const getUserId = (state: State) => {
    if (!state.auth.authUser) {
        throw new Error('User not authenticated.');
    }

    return state.auth.authUser.uid;
};
