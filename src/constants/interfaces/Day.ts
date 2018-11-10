export interface Day {
    hoursNo: number;
    ssNo: number;
    hoursGo: number;
    ssGo: number;
    overtime: number;
    notes: string;

    // Presentational properties
    isDirty?: boolean;
}
