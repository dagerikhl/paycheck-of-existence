import { Record } from 'immutable';

export interface ProjectDb {
    grantsOvertime: boolean;
    maxOvertime: number;
    name: string;
    show: boolean;
}

export interface ProjectJs extends ProjectDb {
    id: string;
}

export type Project = Record<ProjectJs>;
