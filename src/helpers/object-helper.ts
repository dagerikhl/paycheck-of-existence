export const objectEntries = (object: any): any[] => object ? Object.keys(object).map((key) => [key, object[key]]) : [];

export const objectKeys = (object: any): string[] => object ? Object.keys(object) : [];

export const objectValues = (object: any): any[] => object ? Object.keys(object).map((key) => object[key]) : [];
