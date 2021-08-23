// return interval days
// param1: repetition times, params2:old E-Factor
function calcInterval(n, ef) {
    let returnValue;

    if (n === 1) {
        returnValue = 1;
    } else if (n === 2) {
        returnValue = 2;
    } else if (n > 2) {
        returnValue = calcInterval(n - 1) * ef;
    }

    return returnValue;
}

// return new E-Factor
function calcEFactor(ef, q) {
    let newEF = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

    if (q < 3) {
        newEF = ef;
    }

    if (newEF < 1.3) {
        newEF = 1.3;
    }

    return newEF;
}
