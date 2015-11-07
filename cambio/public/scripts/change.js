function asInt(text) {
    return Math.floor(text);
}

function isPositiveInt(number) {
    return isFinite(number) && 0 < number;
}

function toPayList(text) {
    var lines = text.split('\n');
    return lines.map(function (line) { 
        var parts = line.split(':');
        return {
            coins: parts[0].split(',').map(asInt),
            return: asInt(parts[1])
        }
    });
}

function isValidInput(input) {
    return toPayList(input).every(function (pay) {
        return asInt(pay.return) && pay.coins.every(isPositiveInt);
    });
}

function extractData(text) {
    return text.split('#')[0].trim();
}

$(function () {
    $('#pays').keyup(function () {
        var errorMsg = "Por favor, entre una lista de denominaciones de moneda (separada por comas) y una cantidad a devolver (separada por dos puntos).",
            input = extractData($(this).val());
        this.setCustomValidity(isValidInput(input) ? '' : errorMsg);
    });
    
    $('#frmChange').submit(function () {
        var payList = toPayList(extractData($('#pays').val()));
        $.getJSON('change/' + JSON.stringify(payList), function (resultList) {
            $('#resultList').html(resultList.map(function (result, index) {
                var change = [],
                    coins = payList[index].coins.sort(function (a, b) { return a < b; });
                for(var i = 0, coin = coins[0]; i < coins.length; i++, coin = coins[i]) {
                    if (result[coin] > 0) {
                        change.push(coin + 'x' + result[coin]);
                    }
                }
                return change.join(', ') + '<br>';
            }));
        });
        return false;
    });
});
