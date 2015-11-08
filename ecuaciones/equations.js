module.exports = function solve(coefficients) {
    var det  = coefficients[0][0] * coefficients[1][1] - coefficients[0][1] * coefficients[1][0],
        detX = coefficients[0][2] * coefficients[1][1] - coefficients[0][1] * coefficients[1][2],
        detY = coefficients[0][0] * coefficients[1][2] - coefficients[0][2] * coefficients[1][0];

    return [detX / det, detY / det];
};