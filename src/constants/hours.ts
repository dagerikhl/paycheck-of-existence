export const WEEK_COLUMNS = {
    headers: [undefined, 'Date', 'Hours: !OT', 'SS: !OT', 'Hours: OT', 'SS: OT', 'OverTime', 'Notes'],
    properties: ['status', 'date', 'hours', 'ssNo', 'hoursO', 'ssO', 'overtime', undefined],
    classNames: ['status', 'date', 'hours-no', 'ss-no', 'hours-o', 'ss-o', 'overtime', undefined]
};

export const WEEK_ROWS_CSS = [undefined, undefined, undefined, undefined, undefined, 'weekend', 'weekend'];

export const HOUR_LIMITS = {
    maxHoursPerWeek: 40
};
