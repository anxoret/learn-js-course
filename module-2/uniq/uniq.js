export const uniq = (array) => {
    return Array.from(new Set(array));
}

// console.log( uniq([1, 2, 2, 3, 1, 4]) ); // [1, 2, 3, 4]