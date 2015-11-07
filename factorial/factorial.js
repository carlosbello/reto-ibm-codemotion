module.exports = function factorial(numberList) {
    var maxNumber = Math.max.apply(this, numberList),
        factorials = [1],
        i,
        fact = 1;
    for (i = 1; i <= maxNumber; i++) {
        debugger;
        fact *= i;
        factorials[i] = fact;
    }
    return numberList.map(function (number) {
        return factorials[number];
    });
};