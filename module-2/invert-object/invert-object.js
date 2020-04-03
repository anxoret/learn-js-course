export const invertObject = object => {
    let invertObject = {};

    for (let prop in object) {
        invertObject[object[prop]] = prop;
    }

    object = invertObject;

    return invertObject;
}

// const obj = {
//     foo: 'bar'
// };

// invertObject(obj); // {bar: 'foo'}