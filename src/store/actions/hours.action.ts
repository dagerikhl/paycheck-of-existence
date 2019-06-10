import { Dispatch } from 'redux';

import { getState } from '../../helpers';
import { database } from '../../services';
import { Period, Workdays } from '../../types';

export enum HoursActionType {
    GetWorkdaysInPeriod = 'HOURS/GET_WORKDAYS_IN_PERIOD!',
    GetWorkdaysInPeriodSuccess = 'HOURS/GET_WORKDAYS_IN_PERIOD_SUCCESS',
    GetWorkdaysInPeriodFailure = 'HOURS/GET_WORKDAYS_IN_PERIOD_FAILURE',
    UpdateWorkdays = 'HOURS/UPDATE_WORKDAYS!',
    UpdateWorkdaysSuccess = 'HOURS/UPDATE_WORKDAYS_SUCCESS',
    UpdateWorkdaysFailure = 'HOURS/UPDATE_WORKDAYS_FAILURE'
}

export type HoursAction =
    | GetWorkdaysInPeriod
    | GetWorkdaysInPeriodSuccess
    | GetWorkdaysInPeriodFailure
    | UpdateWorkdays
    | UpdateWorkdaysSuccess
    | UpdateWorkdaysFailure;

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
        dispatch(getWorkdaysInPeriodFailureAction(new Error('User not authenticated.')));

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
        dispatch(updateWorkdaysFailureAction(new Error('User not authenticated.')));

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
