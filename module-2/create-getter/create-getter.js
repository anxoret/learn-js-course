export function createGetter(field) {
    let properties = field.split(".");

    return (object) => {
        let result = object;

        for (let property of properties) {
            result = result[property]

            if (result === undefined) break;
        }

        return result;
    }
}

// const product = {
//     category: {
//         title: "Goods"
//     }
// }

// const getter = createGetter('category.title');
// console.error(getter(product)); // Goods