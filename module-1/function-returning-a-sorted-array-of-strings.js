"use strict"

const compareStrings = (a, b) => {
    if (a.localeCompare(b) > 0) return 1;
    if (a.localeCompare(b) == 0) return 0;
    if (a.localeCompare(b) < 0) return -1;
}

const sortStrings = (arrayOfStrings, order) => {
    arrayOfStrings.sort(compareStrings);

    if (order == "desc") {
        arrayOfStrings.reverse();
    }

    return arrayOfStrings;
}

console.log(sortStrings(['b', 'a', 'c'], 'asc'))

