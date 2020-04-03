"use strict"

let calculator = {
    read() {
        this.a = prompt("Введите первое число", 0);
        this.b = prompt("Введите первое число", 1);
    },

    sum() {
        return parseInt(this.a) + parseInt(this.b)
    },

    mul() {
        return this.a * this.b
    }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );