export interface Day {

    // Hours that doesn't grant overtime
    hoursNo: number;

    // SS from hours that doesn't grant overtime
    ssNo: number;

    // Hours that grants overtime
    hoursO: number;

    // SS from hours that grants overtime
    ssO: number;

    // Overtime hours
    ot: number;

    // Notes concerning this day
    notes: string;

}
