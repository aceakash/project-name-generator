#!/usr/bin/env node

const generate = require('./generator')
const program = require('commander')

program
    .version('1.0.0')
    .option('-w, --words [num]', 'number of words [2]', 2)
    .option('-n, --numbers', 'use numbers')
    .option('-a, --alliterative', 'use alliterative')
    .option('-o, --output [output]', 'output type [raw|dashed|spaced|dot|under_scored|camelcase]', /^(raw|dashed|spaced|dot|under_scored|camelcase)$/i)
    .option('-v, --vocab [category]', 'category of vocaburaries [default|fruits|breads]', /^(default|fruits|breads)$/i)
    .option('-g, --geo [category]', 'category of geolocations [default|numbers]', /^(default|numbers)$/i)
    .option('-l, --letter [letter]', 'specify first letter')
    .parse(process.argv)

let project_name = generate({
    words: program.words, 
    number: program.numbers, 
    alliterative: program.alliterative, 
    vocab: program.vocab,
    geo: program.geo,
    startingLetter: program.letter?program.letter.substring(0,1):null
});

if (program.output == "dashed"){
    console.log(project_name.dashed);
} else if (program.output == "raw") {
    console.log(project_name.raw);
} else if (program.output == "spaced") {
    console.log(project_name.spaced);
} else if (program.output == "dot") {
    console.log(project_name.dot);
} else if (program.output == "under_scored") {
    console.log(project_name.under_scored);
} else if (program.output == "camelcase") {
    console.log(project_name.camelcase);
} else {
    console.log(project_name);
}