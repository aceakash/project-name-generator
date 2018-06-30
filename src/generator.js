const _ = require('lodash');
const nouns = require('./nouns');
const fruits = require('./fruits');
const adjectives = require('./adjectives');
const thailand_provinces = require('./thailand_provinces');


module.exports = generate;

generate.generate = generate;
function generate(options) {
  var defaults = {
    number: false,
    words: 2,
    alliterative: false,
  };
  options = _.merge(defaults, options || {});

  var raw = getRawProjName(options);

  return {
    raw: raw,
    dashed: raw.join('-'),
    spaced: raw.join(' '),
    dot: raw.join('.'),
    under_scored: raw.join('_')
  };
}

function getRawProjName(options) {
  var raw = [];
  _.times(options.words - 1, function () {
    if (options.alliterative && raw.length)
      raw.push(_.sample(getAlliterativeMatches(adjectives, raw[0].substring(0, 1))));
    else
      raw.push(_.sample(adjectives).toLowerCase());
  });
  
  var vocab = getVocab(options);

  if (options.alliterative)
    raw.push(_.sample(getAlliterativeMatches(vocab, raw[0].substring(0, 1))).replace(/\s/g, "-"));
  else
    raw.push(_.sample(vocab).toLowerCase().replace(/\s/g, "-"));

  if (options.number || options.geo === 'numbers') {
    raw.push(_.random(1, 9999));
  }
  return raw;
}

function getAlliterativeMatches(arr, letter) {
  var check = letter.toLowerCase();
  return _.filter(arr, function(elm) { return elm.substring(0, 1).toLowerCase() === check; });
}

function getVocab(options) {

  if(options.geo === undefined) {
    return options.vocab === 'fruits' ? fruits : nouns;
  }
  else {
    return thailand_provinces;
  }
}
