var _ = require('lodash'),
  nouns = require('../src/nouns'),
  adjectives = require('../src/adjectives');

module.exports.generate = function (options) {
  var defaults = {
    number: false,
    words: 2
  };
  options = _.merge(defaults, options || {});

  var raw = getRawProjName(options);

  return {
    raw: raw,
    dashed: raw.join('-'),
    spaced: raw.join(' ')
  };
};

function getRawProjName(options) {
  var raw = [];
  _.times(options.words - 1, function () {
    raw.push(_.sample(adjectives).toLowerCase());
  });
  raw.push(_.sample(nouns).toLowerCase());

  if (options.number) {
    raw.push(_.random(1, 9999));
  }
  return raw;
}
