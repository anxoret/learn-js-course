export const trimSymbols = (string, letterRepetitions) => {
    let arrayOfString = string.split("");

    for (let i = 0; i < arrayOfString.length; i++) {
        let repeatingLetters = [];

        for (let k = i + 1; k < arrayOfString.length; k++) {

            // if (k === i) continue;

            if (arrayOfString[i] === arrayOfString[k]) {
                console.log(`${arrayOfString[i]} === ${arrayOfString[k]}`)
                repeatingLetters.push(k);
            }
        }

        if (repeatingLetters.length > letterRepetitions) {
            repeatingLetters.reverse();
            repeatingLetters.length = repeatingLetters.length - letterRepetitions + 1;   
        }

        repeatingLetters.forEach(letter => {
            arrayOfString[letter] = ""
        });
    }

    let newArrayOfString = arrayOfString.filter(letter => {
        return letter !== ""
    });

    return newArrayOfString.join("");

}

// // trimSymbols('xxxaaaaab', 1); // 'xab'

// console.log(trimSymbols('xxxaaaaab', 10)); // 'xab'