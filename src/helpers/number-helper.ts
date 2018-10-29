export const createArrayFromRange = (start: number, length: number) => {
    return Array.from({ length }, (_, i) => start + i + 1);
};
