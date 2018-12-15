import { createSelector } from 'reselect';

import { State } from '../states';

// Selectors

const getAuthUser = (state: State) => state.auth.authUser;

// Reselectors

export const getUserId = createSelector([getAuthUser], (authUser) => {
    if (!authUser) {
        throw new Error('User not authenticated.');
    }

    return authUser.uid;
});
