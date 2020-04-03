"use strict"

const sortSalaries = (a, b) => {
    if (a[1] > b[1]) return 1; 
    if (a[1] == b[1]) return 0; 
    if (a[1] < b[1]) return -1;
}

const topSalary = salaries => {
    let salariesArray = Object.entries(salaries);

    salariesArray.sort(sortSalaries).reverse();

    let [highestPaidEmployee, ] = salariesArray[0];

    return highestPaidEmployee;
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

console.log( topSalary(salaries) );