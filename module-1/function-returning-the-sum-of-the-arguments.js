"use strict"

const sum = (a) => {
    let argumentsSum = a;

    function innerSum (b) {
        argumentsSum += b;
        return innerSum;
    };

    innerSum.toString = () => argumentsSum;

    return innerSum;
}

console.log(sum(1)(2)(3)(5))
