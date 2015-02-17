var _ = require('lodash');
var fs = require('fs');
var adjectives = require('')

var args = process.argv.slice(2);
var merged = getMergedArray( sanitiseArray( readArrayFromFile(args[0])));
console.log(merged);

function readArrayFromFile(filePath) {
	fs.readFile(filePath, 'utf-8', function (err, data) {
		if(err) {
			console.error(err);
			process.exit(1);
		}
		return data.split('\n');
	});
}

function sanitiseArray(array) {
	return _(array)
	.map(_.trim)
	.reject(_.isEmpty)
	.reject(function (item) { return item.contains('-'); })
	.reject(function (item) { return item.contains(' '); })
	.value();
}

function getMergedArray(existingArray, newArray) {

}