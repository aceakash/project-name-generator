var _ = require('lodash');
var fs = require('fs');
var adjectives = require('./adjectives')

var args = process.argv.slice(2);
var merged = _.union(adjectives, sanitiseArray( readArrayFromFile(args[0]) ) ).sort();

console.log(merged);

function readArrayFromFile(filePath) {
	var data = fs.readFileSync(filePath, 'utf-8');
	return data.split('\n');
}

function sanitiseArray(array) {
	return _(array)
	.map(_.trim)
	.reject(_.isEmpty)
  .reject(function (item) { return _.contains(item, '-'); })
  .reject(function (item) { return _.contains(item, ' '); })
  .value();
}

function getMergedArray(existingArray, newArray) {
	return (existingArray, newArray);
}