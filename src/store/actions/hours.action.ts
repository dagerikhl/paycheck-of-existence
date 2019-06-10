import { Dispatch } from 'redux';

import { getState } from '../../helpers';
import { database } from '../../services';
import { Period, Workdays } from '../../types';

const unauthenticatedError = new Error('User not authenticated.');

export enum HoursActionType {
    GetWorkdays = 'HOURS/GET_WORKDAYS!',
    GetWorkdaysSuccess = 'HOURS/GET_WORKDAYS_SUCCESS',
    GetWorkdaysFailure = 'HOURS/GET_WORKDAYS_FAILURE',

    GetWorkdaysInPeriod = 'HOURS/GET_WORKDAYS_IN_PERIOD!',
    GetWorkdaysInPeriodSuccess = 'HOURS/GET_WORKDAYS_IN_PERIOD_SUCCESS',
    GetWorkdaysInPeriodFailure = 'HOURS/GET_WORKDAYS_IN_PERIOD_FAILURE',

    UpdateWorkdays = 'HOURS/UPDATE_WORKDAYS!',
    UpdateWorkdaysSuccess = 'HOURS/UPDATE_WORKDAYS_SUCCESS',
    UpdateWorkdaysFailure = 'HOURS/UPDATE_WORKDAYS_FAILURE'
}

export type HoursAction =
    | GetWorkdays
    | GetWorkdaysSuccess
    | GetWorkdaysFailure

    | GetWorkdaysInPeriod
    | GetWorkdaysInPeriodSuccess
    | GetWorkdaysInPeriodFailure

    | UpdateWorkdays
    | UpdateWorkdaysSuccess
    | UpdateWorkdaysFailure;

// Get workdays

interface GetWorkdays {
    type: HoursActionType.GetWorkdays;
}

interface GetWorkdaysSuccess {
    type: HoursActionType.GetWorkdaysSuccess;
    workdays: Workdays;
}

interface GetWorkdaysFailure {
    type: HoursActionType.GetWorkdaysFailure;
    error: Error;
}

export const getWorkdaysAction = () => (dispatch: Dispatch) => {
    dispatch({
        type: HoursActionType.GetWorkdays
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(getWorkdaysFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).workdays.getAll()
        .then((workdays) => {
            dispatch(getWorkdaysSuccessAction(workdays));
        })
        .catch((error) => {
            dispatch(getWorkdaysFailureAction(error));

            console.error(error);
        });
};

const getWorkdaysSuccessAction = (workdays: Workdays): GetWorkdaysSuccess => ({
    type: HoursActionType.GetWorkdaysSuccess,
    workdays
});

const getWorkdaysFailureAction = (error: Error): GetWorkdaysFailure => ({
    type: HoursActionType.GetWorkdaysFailure,
    error
});

// Get workdays in period

interface GetWorkdaysInPeriod {
    type: HoursActionType.GetWorkdaysInPeriod;
}

interface GetWorkdaysInPeriodSuccess {
    type: HoursActionType.GetWorkdaysInPeriodSuccess;
    workdays: Workdays;
}

interface GetWorkdaysInPeriodFailure {
    type: HoursActionType.GetWorkdaysInPeriodFailure;
    error: Error;
}

export const getWorkdaysInPeriodAction = (period: Period) => (dispatch: Dispatch) => {
    dispatch({
        type: HoursActionType.GetWorkdaysInPeriod,
        period
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(getWorkdaysInPeriodFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).workdays.getInPeriod(period)
        .then((workdays) => {
            dispatch(getWorkdaysInPeriodSuccessAction(workdays));
        })
        .catch((error) => {
            dispatch(getWorkdaysInPeriodFailureAction(error));

            console.error(error);
        });
};

const getWorkdaysInPeriodSuccessAction = (workdays: Workdays): GetWorkdaysInPeriodSuccess => ({
    type: HoursActionType.GetWorkdaysInPeriodSuccess,
    workdays
});

const getWorkdaysInPeriodFailureAction = (error: Error): GetWorkdaysInPeriodFailure => ({
    type: HoursActionType.GetWorkdaysInPeriodFailure,
    error
});

// Update workdays

interface UpdateWorkdays {
    type: HoursActionType.UpdateWorkdays;
    workdays: Workdays;
}

interface UpdateWorkdaysSuccess {
    type: HoursActionType.UpdateWorkdaysSuccess;
    workdays: Workdays;
}

interface UpdateWorkdaysFailure {
    type: HoursActionType.UpdateWorkdaysFailure;
    error: Error;
}

export const updateWorkdaysAction = (workdays: Workdays) => (dispatch: Dispatch) => {
    dispatch({
        type: HoursActionType.UpdateWorkdays,
        workdays
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(updateWorkdaysFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).workdays.updateGroup(workdays)
        .then(() => {
            dispatch(updateWorkdaysSuccessAction(workdays));
        })
        .catch((error) => {
            dispatch(updateWorkdaysFailureAction(error));

            console.error(error);
        });
};

const updateWorkdaysSuccessAction = (workdays: Workdays): UpdateWorkdaysSuccess => ({
    type: HoursActionType.UpdateWorkdaysSuccess,
    workdays
});

const updateWorkdaysFailureAction = (error: Error): UpdateWorkdaysFailure => ({
    type: HoursActionType.UpdateWorkdaysFailure,
    error
});
