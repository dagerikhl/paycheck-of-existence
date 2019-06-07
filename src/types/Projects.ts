import { List } from 'immutable';

import { Project, ProjectJs } from './';

export interface ProjectsDb {
    [projectId: string]: {
        grantsOvertime: boolean;
        maxOvertime: number;
        name: string;
        workdayLength: number;
    };
}

export type ProjectsJs = ProjectJs[];

export type Projects = List<Project>;
