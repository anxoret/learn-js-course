"use strict"

const sumSalaries = salaries => {

    // solution with "Object.values" and reduce
    // let salariesArray = Object.values(salaries);

    // let salariesSum = salariesArray.reduce((sum, current) => {
    //     return sum + current;
    // }, 0);

    // return salariesSum;
    
    // solution with "for of"

    let salariesSum = 0;

    for (let salary of Object.values(salaries)) {
        salariesSum += salary
    }

    return salariesSum;
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

alert( sumSalaries(salaries) ); // 650