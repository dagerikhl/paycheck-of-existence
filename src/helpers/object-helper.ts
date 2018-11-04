export const objectKeys = (object: any) => object ? Object.keys(object) : [];
export const objectValues = (object: any) => object ? Object.keys(object).map((key) => object[key]) : [];
