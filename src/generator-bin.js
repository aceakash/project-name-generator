#!/usr/bin/env node

const generate = require('./generator')
const program = require('commander')

program
    .version('1.0.0')
    .option('-w, --words [num]', 'number of words [2]', 2)
    .option('-n, --numbers', 'use numbers')
    .option('-a, --alliterative', 'use alliterative')
    .option('-o, --output [output]', 'output type [raw|dashed|spaced|dot|under_scored]', /^(raw|dashed|spaced|dot|under_scored)$/i)
    .option('-v, --vocab [category]', 'category of vocaburaries [default|fruits]', /^(default|fruits)$/i)
    .parse(process.argv)

let project_name = generate({
    words: program.words, 
    number: program.numbers, 
    alliterative: program.alliterative, 
    vocab: program.vocab
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
} else {
    console.log(project_name);
}