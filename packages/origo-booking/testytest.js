const { parse } = require('graphql');
const { readFileSync } = require('fs');

const data = readFileSync('schema.graphql', 'utf8');
console.log(data);

console.log(parse(data));