"use strict"

const camelize = (str) => {
    let camelizeWord = str
                        .split("-")
                        .map((word, index) => {
                            if (index == 0) {
                                return word
                            }

                            let firstLetter = word.slice(0, 1).toUpperCase();
                            word = firstLetter + word.slice(1)
                            
                            return word
                        })
                        .join("")
    console.log(camelizeWord)
    return camelizeWord
}

console.log(camelize("background-color") == 'backgroundColor');
console.log(camelize("list-style-image") == 'listStyleImage');
console.log(camelize("-webkit-transition") == 'WebkitTransition');