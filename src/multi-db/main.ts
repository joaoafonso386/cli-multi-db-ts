const leftPad = (word: string, space: number) => {
    return `${' '.repeat(space)}${word}`
}


const res = leftPad("val", 60)

console.log(res)