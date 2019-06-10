import { List } from 'immutable';

import { Project, ProjectDb, ProjectJs } from './';

export interface ProjectsDb {
    [projectId: string]: ProjectDb;
}

export type ProjectsJs = ProjectJs[];

export type Projects = List<Project>;
