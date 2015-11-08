function simbol(text) {
    return text === '+' ? 1 : -1;
}

function coefficients(equation) {
    return [+equation[1], simbol(equation[2]) * equation[3], +equation[4]];
}

function extractCoefficientsMatrix(text) {
    var equationParser = /(-?\d+)\s*x\s*(\+|\-)\s*(-?\d+)\s*y\s*=\s*(\-?\d+)/gi,
        equation1 = equationParser.exec(text),
        equation2 = equationParser.exec(text),
        coefficients1 = coefficients(equation1),
        coefficients2 = coefficients(equation2);
    
    return [coefficients1, coefficients2];
}

function toCoefficientsMatrixList(text) {
    var lines = text.split('\n');
    return lines.map(extractCoefficientsMatrix);
}

function extractData(text) {
    return text.replace(/#/gi, '').trim();
}

function isTwoEquationsPerLine(text) {
    var lineValidator = /((-?\d+)\s*x\s*(\+|\-)\s*(-?\d+)\s*y\s*=\s*(\-?\d+)\s*){2}/i;
    return text.split('\n').every(function (line) {
        return lineValidator.exec(line);
    });        
}

$(function () {
    $('#equationList').change(function () {
        var errorMsg = "Por favor, entre dos ecuaciones por línea con la forma nx+my=c",
            input = extractData($(this).val());
        this.setCustomValidity(isTwoEquationsPerLine(input) ? '' : errorMsg);
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