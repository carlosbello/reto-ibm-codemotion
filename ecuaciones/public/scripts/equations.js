function simbol(text) {
    return text === '+' ? 1 : -1;
}

function coefficients(equation) {
    return [+equation[1] || 1, simbol(equation[2]) * (equation[3] || 1), +equation[4]];
}

function extractCoefficients(equationParser, text) {
    var equation1 = equationParser.exec(text);
    return equation1 ? coefficients(equation1) : null;
}

function toCoefficientsMatrixList(text) {
    var coefficients,
        count = 0,
        list = [],
        equationParser = /(-?\d+)?\s*x\s*(\+|\-)\s*(-?\d+)?\s*y\s*=\s*(\-?\d+)/gi;
    while (coefficients = extractCoefficients(equationParser, text)) {
        if (count === 0) list.push([]); 
        list[list.length - 1][count] = coefficients;
        count = (count + 1) % 2;
    }
    return list;
}

function extractData(text) {
    return text.replace(/#/gi, '').trim();
}

function isEvenNumberOfEquations(text) {
    var textValidator = /^((\s*(-?\d+)?\s*x\s*(\+|\-)\s*(-?\d+)?\s*y\s*=\s*(\-?\d+)\s*\n*){2})+$/i;
    return text.match(textValidator);        
}

$(function () {
    $('#equationList').change(function () {
        var errorMsg = "Por favor, entre un número par de ecuaciones con la forma nx+my=c",
            input = extractData($(this).val());
        this.setCustomValidity(isEvenNumberOfEquations(input) ? '' : errorMsg);
    });
    
    $('#frmFactorial').submit(function () {
        var coefficients = toCoefficientsMatrixList(extractData($('#equationList').val()));
        $.getJSON('solve/' + JSON.stringify(coefficients), function (result) {
            $('#resultList').html(result.map(function (solution) {
                return 'x=' + solution[0] + ' y=' + solution[1] + '<br>';
            }));
        });
        return false;
    });
});