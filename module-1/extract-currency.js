"use strict"

const extractCurrencyValue = (price) => {
    let value = Number(price.slice(1));

    return value
}

console.log(typeof extractCurrencyValue('$120'))
alert( extractCurrencyValue('$120') === 120 ); // true