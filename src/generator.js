var _             = require('lodash'),
  nouns         = require('../src/nouns'),
  adjectives    = require('../src/adjectives');

module.exports.generate = function (addNumberSuffix) {
  var rawAppName = getRawAppName(!!addNumberSuffix);
  return {
    spaced: rawAppName.join(' '),
    dashed: rawAppName.join('-'),
    raw: rawAppName
  };
};

function getRawAppName(addNumberSuffix) {
  var rawAppName = [
    _.sample(adjectives).toLowerCase(),
    _.sample(nouns).toLowerCase()
  ];

  if (addNumberSuffix) {
    rawAppName.push( _.random(1, 9999) );
  }

  return rawAppName;
}
