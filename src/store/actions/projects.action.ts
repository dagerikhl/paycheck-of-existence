import { Dispatch } from 'redux';

import { getState } from '../../helpers';
import { database } from '../../services';
import { Project, Projects } from '../../types';

const unauthenticatedError = new Error('User not authenticated.');

export enum ProjectsActionType {
    GetProject = 'PROJECTS/GET_PROJECT!',
    GetProjectSuccess = 'PROJECTS/GET_PROJECT_SUCCESS',
    GetProjectFailure = 'PROJECTS/GET_PROJECT_FAILURE',

    GetProjects = 'PROJECTS/GET_PROJECTS!',
    GetProjectsSuccess = 'PROJECTS/GET_PROJECTS_SUCCESS',
    GetProjectsFailure = 'PROJECTS/GET_PROJECTS_FAILURE',

    UpdateProject = 'PROJECTS/UPDATE_PROJECT!',
    UpdateProjectSuccess = 'PROJECTS/UPDATE_PROJECT_SUCCESS',
    UpdateProjectFailure = 'PROJECTS/UPDATE_PROJECT_FAILURE',

    DeleteProject = 'PROJECTS/DELETE_PROJECT!',
    DeleteProjectSuccess = 'PROJECTS/DELETE_PROJECT_SUCCESS',
    DeleteProjectFailure = 'PROJECTS/DELETE_PROJECT_FAILURE'
}

export type ProjectsAction =
    | GetProject
    | GetProjectSuccess
    | GetProjectFailure

    | GetProjects
    | GetProjectsSuccess
    | GetProjectsFailure

    | UpdateProject
    | UpdateProjectSuccess
    | UpdateProjectFailure

    | DeleteProject
    | DeleteProjectSuccess
    | DeleteProjectFailure;

// Get project

interface GetProject {
    type: ProjectsActionType.GetProject;
    id: string;
}

interface GetProjectSuccess {
    type: ProjectsActionType.GetProjectSuccess;
}

interface GetProjectFailure {
    type: ProjectsActionType.GetProjectFailure;
    error: Error;
}

export const getProjectAction = (id: string) => (dispatch: Dispatch) => {
    dispatch({
        type: ProjectsActionType.GetProject,
        id
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(getProjectFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).projects.get(id)
        .then(() => {
            dispatch(getProjectSuccessAction());
        })
        .catch((error) => {
            dispatch(getProjectFailureAction(error));

            console.error(error);
        });
};

const getProjectSuccessAction = (): GetProjectSuccess => ({
    type: ProjectsActionType.GetProjectSuccess
});

const getProjectFailureAction = (error: Error): GetProjectFailure => ({
    type: ProjectsActionType.GetProjectFailure,
    error
});

// Get projects

interface GetProjects {
    type: ProjectsActionType.GetProjects;
}

interface GetProjectsSuccess {
    type: ProjectsActionType.GetProjectsSuccess;
    projects: Projects;
}

interface GetProjectsFailure {
    type: ProjectsActionType.GetProjectsFailure;
    error: Error;
}

export const getProjectsAction = () => (dispatch: Dispatch) => {
    dispatch({
        type: ProjectsActionType.GetProjects
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(getProjectsFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).projects.getAll()
        .then((projects) => {
            dispatch(getProjectsSuccessAction(projects));
        })
        .catch((error) => {
            dispatch(getProjectsFailureAction(error));

            console.error(error);
        });
};

const getProjectsSuccessAction = (projects: Projects): GetProjectsSuccess => ({
    type: ProjectsActionType.GetProjectsSuccess,
    projects
});

const getProjectsFailureAction = (error: Error): GetProjectsFailure => ({
    type: ProjectsActionType.GetProjectsFailure,
    error
});

// Update project

interface UpdateProject {
    type: ProjectsActionType.UpdateProject;
    project: Project;
}

interface UpdateProjectSuccess {
    type: ProjectsActionType.UpdateProjectSuccess;
}

interface UpdateProjectFailure {
    type: ProjectsActionType.UpdateProjectFailure;
    error: Error;
}

export const updateProjectAction = (project: Project) => (dispatch: Dispatch) => {
    dispatch({
        type: ProjectsActionType.UpdateProject,
        project
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(updateProjectFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).projects.update(project)
        .then(() => {
            dispatch(updateProjectSuccessAction());
        })
        .catch((error) => {
            dispatch(updateProjectFailureAction(error));

            console.error(error);
        });
};

const updateProjectSuccessAction = (): UpdateProjectSuccess => ({
    type: ProjectsActionType.UpdateProjectSuccess
});

const updateProjectFailureAction = (error: Error): UpdateProjectFailure => ({
    type: ProjectsActionType.UpdateProjectFailure,
    error
});

// Delete project

interface DeleteProject {
    type: ProjectsActionType.DeleteProject;
    project: Project;
}

interface DeleteProjectSuccess {
    type: ProjectsActionType.DeleteProjectSuccess;
}

interface DeleteProjectFailure {
    type: ProjectsActionType.DeleteProjectFailure;
    error: Error;
}

export const deleteProjectAction = (id: string) => (dispatch: Dispatch) => {
    dispatch({
        type: ProjectsActionType.DeleteProject,
        id
    });

    const state = getState();

    if (!state.auth.authUser) {
        dispatch(deleteProjectFailureAction(unauthenticatedError));

        return;
    }

    database(state.auth.authUser.uid).projects.delete(id)
        .then(() => {
            dispatch(deleteProjectSuccessAction());
        })
        .catch((error) => {
            dispatch(deleteProjectFailureAction(error));

            console.error(error);
        });
};

const deleteProjectSuccessAction = (): DeleteProjectSuccess => ({
    type: ProjectsActionType.DeleteProjectSuccess
});

const deleteProjectFailureAction = (error: Error): DeleteProjectFailure => ({
    type: ProjectsActionType.DeleteProjectFailure,
    error
});
