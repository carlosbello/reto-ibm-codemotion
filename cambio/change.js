function select(coins, retrn, change) {
    var i, j,
        seleccion = {};

    for(i = 0; i < coins.length; i++) { 
        seleccion[coins[i]] = 0; 
    }
    i = coins.length-1;
    j = retrn;
    while (j > 0) {
        if (i > 0 && change[i][j] === change[i-1][j]) {
            i--;
        } else {
            seleccion[coins[i]]++;
            j = j - coins[i];
        }
    }

    return seleccion;
}

function calc(coins, retrn) {
    var change = [];
    
    for (var i = 0; i < coins.length; i++) {
        change[i] = [];
    }
    
    function computeChange(type, value) {
        if (value === 0)           return 0;
        if (value < 0 || type < 0) return Infinity;
        if (0 <= change[type][value] && change[type][value] < Infinity) return change[type][value];
        change[type][value] = Math.min(1 + computeChange(type, value - coins[type]), computeChange(type - 1, value));
        return change[type][value];
    }
    
    computeChange(coins.length - 1, retrn);
    return change;
}   

module.exports = function change(pays) {
    return pays.map(function (pay) {
        var coins = pay.coins.sort(function (a, b) { return a > b;});
        var change = calc(coins, pay.return);
        return select(coins, pay.return, change);
    });
};