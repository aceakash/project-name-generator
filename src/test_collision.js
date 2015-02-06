var fs = require('fs');
var nameGen = require('./generator');

var _ = require('lodash');

var i = 0;
var dict = {};
while(true) {
	if(i % 1000 === 0) console.log(i);

	var name = nameGen.generate(true).dashed;
	if(name in dict) {
		console.log('Found collision', name);
		break;
	}
  dict[name] = name;
  i++;
}



