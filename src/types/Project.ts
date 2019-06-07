import { Record } from 'immutable';

export interface ProjectJs {
    grantsOvertime: boolean;
    id: string;
    maxOvertime: number;
    name: string;
    workdayLength: number;
}

export type Project = Record<ProjectJs>;
