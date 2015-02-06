var _             = require('lodash'),
  nouns         = require('../src/nouns'),
  adjectives    = require('../src/adjectives');

module.exports.generate = function (addNumberSuffix) {
  var rawProjName = getRawProjName(!!addNumberSuffix);
  return {
    spaced: rawProjName.join(' '),
    dashed: rawProjName.join('-'),
    fused: rawProjName.join(''),
    raw: rawProjName
  };
};

function getRawProjName(addNumberSuffix) {
  var rawProjName = [
    _.sample(adjectives).toLowerCase(),
    _.sample(nouns).toLowerCase()
  ];

  if (addNumberSuffix) {
    rawProjName.push( _.random(1, 9999) );
  }

  return rawProjName;
}
