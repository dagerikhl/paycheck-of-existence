import { Record } from 'immutable';

export interface ProjectDb {
    grantsOvertime: boolean;
    maxOvertime: number;
    name: string;
    workdayLength: number;
}

export interface ProjectJs extends ProjectDb {
    id: string;
}

export type Project = Record<ProjectJs>;
