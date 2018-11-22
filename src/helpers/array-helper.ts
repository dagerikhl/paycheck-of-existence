export const range = (start: number, length: number) => Array.from({ length }, (_, i) => start + i);

export const pickRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
