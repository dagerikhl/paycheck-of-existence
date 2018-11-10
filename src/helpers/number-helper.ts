export const roundTo = (value: number, roundToValue = 1) => {
    const rest = value % roundToValue;

    if (rest <= (roundToValue / 2)) {
        return value - rest;
    } else {
        return value + roundToValue - rest;
    }
};
