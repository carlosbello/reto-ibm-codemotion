/**
 * Encuentra la solución a las ecuaciones lineales definidas en la matriz de coefficientes,
 * usando la regla de cramer [https://es.wikipedia.org/wiki/Regla_de_Cramer]
 * 
 * @apram coefficients Matriz ampliada de coeficientes de las ecuaciones
 */
module.exports = function solve(coefficients) {
    var det  = coefficients[0][0] * coefficients[1][1] - coefficients[0][1] * coefficients[1][0],
        detX = coefficients[0][2] * coefficients[1][1] - coefficients[0][1] * coefficients[1][2],
        detY = coefficients[0][0] * coefficients[1][2] - coefficients[0][2] * coefficients[1][0];

    return [detX / det, detY / det];
};