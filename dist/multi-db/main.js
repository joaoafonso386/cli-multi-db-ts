"use strict";
const leftPad = (word, space) => {
    return `${' '.repeat(space)}${word}`;
};
const res = leftPad("val", 60);
console.log(res);
