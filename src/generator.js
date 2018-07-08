const _ = require('lodash');
const nouns = require('./nouns');
const fruits = require('./fruits');
const adjectives = require('./adjectives');
const thailand_provinces = require('./thailand_provinces');
const thailand_districts = require('./thailand_districts');
const breads = require('./breads');

module.exports = generate;

generate.generate = generate;
function generate(options) {
  var defaults = {
    number: false,
    words: 2,
    alliterative: false,
    vocab: 'default',
    startingLetter: null,
  };
  options = _.merge(defaults, options || {});

  var raw = getRawProjName(options);

  return {
    raw: raw,
    dashed: raw.join('-'),
    spaced: raw.join(' '),
    dot: raw.join('.'),
    under_scored: raw.join('_'),
    camelcase: camelCase(raw)
  };
}

function getRawProjName(options) {
  var raw = [];
  _.times(options.words - 1, function () {
    if (options.alliterative && raw.length)
      raw.push(_.sample(getAlliterativeMatches(adjectives, raw[0].substring(0, 1))));
    else {
      if (typeof options.alliterative === 'string' && options.alliterative.length)
        raw.push(_.sample(getAlliterativeMatches(adjectives, options.alliterative.substring(0, 1))));
      else
      raw.push(_.sample(options.startingLetter?getAlliterativeMatches(adjectives, options.startingLetter.substring(0,1).toLowerCase()):adjectives).toLowerCase());
    }
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
    switch(options.vocab)
    {
      case "fruits": return fruits;
      case "breads": return breads;
      default: return nouns;
    }
  }
  else {
    return options.geo === 'default' || options.geo === 'numbers' ? thailand_provinces : thailand_districts;
  }
}

generate.camelCase = camelCase;
function camelCase(input) {
  return input.map(function(n, i) {
    return i === 0 || typeof n !== 'string' ? n : n.substr(0, 1).toUpperCase() + n.substr(1);
  }).join("");
}
