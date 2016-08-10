#! /usr/bin/env node

var generate = require('project-name-generator');

main(process.argv.slice(2));

function main(args){
	var words = 2;
	var number = false;
	var dashed = false;
	var raw = false;
	var spaced = false;
  var alliterative = false;
	for (x=0; x<args.length; x++){
		switch(args[x]){
			case "-w":
			case "--word":
			case "--words":
				words = parseInt(args[++x])
				break;
			case "-n":
			case "--number":
			case "--numbers":
				number = true;
				break;
			case "-d":
			case "--dashed":
				dashed = true;
				break;
			case "-r":
			case "--raw":
				raw = true;
				break;
			case "-s":
			case "--spaced":
				spaced = true;
				break;
      case "-a":
      case "--alliterative":
        alliterative = true;
        break;
		}
	}

	var project_name = generate({words: words, number: number, alliterative: alliterative});

	if (dashed){
		console.log(project_name.dashed);
	} else if (raw) {
		console.log(project_name.raw);
	} else if (spaced) {
		console.log(project_name.spaced);
	} else {
		console.log(project_name);
	}
}
