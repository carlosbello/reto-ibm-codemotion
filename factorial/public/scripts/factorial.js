function toNumberList(text) {
    var lines = text.split('\n');
    return lines.map(function (line) { 
        return Math.floor(line);
    });
}

function isOneNumberPerLine(input, minNumber, maxNumber) {
    return toNumberList(input).every(function (element) {
        return isFinite(element) && minNumber <= element && element <= maxNumber;
    });
}

function extractData(text) {
    return text.split('#')[0].trim();
}

$(function () {
    $('#numberList').keyup(function () {
        var errorMsg = "Por favor, entre un número por línea, entre 1 y 15.",
            input = extractData($(this).val());
        this.setCustomValidity(isOneNumberPerLine(input, 1, 15) ? '' : errorMsg);
    });
    
    $('#frmFactorial').submit(function () {
        var numberList = toNumberList(extractData($('#numberList').val()));
        $.getJSON('factorial/' + JSON.stringify(numberList), function (result) {
            $('#resultList').html(result.map(function (number) {
                return number + '<br>';
            }));
        });
        return false;
    });
});