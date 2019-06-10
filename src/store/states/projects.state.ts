import { List } from 'immutable';

import { Projects } from '../../types';

export interface ProjectsState {
    projects: Projects;
    error?: Error;
    isFetching?: boolean;
    isStoring?: boolean;
}

export const initialProjectsState: ProjectsState = {
    projects: List()
};
