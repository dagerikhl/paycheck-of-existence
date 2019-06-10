import { ProjectsAction, ProjectsActionType } from '../actions';
import { initialProjectsState, ProjectsState } from '../states';

export const projectsReducer = (state: ProjectsState = initialProjectsState, action: ProjectsAction): ProjectsState => {
    switch (action.type) {
        case ProjectsActionType.GetProject:
        case ProjectsActionType.GetProjects:
            return {
                ...state,
                isFetching: true
            };
        case ProjectsActionType.GetProjectSuccess:
            return {
                ...state,
                isFetching: false
            };
        case ProjectsActionType.GetProjectFailure:
        case ProjectsActionType.GetProjectsFailure:
            return {
                ...state,
                error: action.error,
                isFetching: false
            };

        case ProjectsActionType.GetProjectsSuccess:
            return {
                ...state,
                projects: action.projects,
                isFetching: false
            };

        case ProjectsActionType.UpdateProject:
        case ProjectsActionType.DeleteProject:
            return {
                ...state,
                isStoring: true
            };
        case ProjectsActionType.UpdateProjectSuccess:
        case ProjectsActionType.DeleteProjectSuccess:
            return {
                ...state,
                isStoring: false
            };
        case ProjectsActionType.UpdateProjectFailure:
        case ProjectsActionType.DeleteProjectFailure:
            return {
                ...state,
                error: action.error,
                isStoring: false
            };

        default:
            return state;
    }
};
