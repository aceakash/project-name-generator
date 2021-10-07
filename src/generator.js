const _ = require('lodash');
const nouns = require('./nouns');
const adjectives = require('./adjectives');


module.exports = generate;

generate.generate = generate;
function generate(options) {
  var defaults = {
    number: false,
    words: 4,
    alliterative: false,
  };
  options = _.merge(defaults, options || {});

  var raw = getRawProjName(options);

  return {
    raw: raw,
    dashed: raw.join('-'),
    spaced: raw.join(' ')
  };
}

function getRawProjName(options) {
  var raw = [];

  /* Program branches between randomly or precisely picked results */
  if (options.includes) {
    raw = getIncludedMatches(_.concat(adjectives, nouns), options.includes, options.words);
  } else {
    _.times(options.words - 1, function () {
      if (options.alliterative && raw.length)
        raw.push(_.sample(getAlliterativeMatches(adjectives, raw[0].substring(0, 1))));
      else
        raw.push(_.sample(adjectives).toLowerCase());
    });
  
    if (options.alliterative)
      raw.push(_.sample(getAlliterativeMatches(nouns, raw[0].substring(0, 1))));
    else
      raw.push(_.sample(nouns).toLowerCase());
  
    if (options.number) {
      raw.push(_.random(1, 9999));
    }  
  }

  return raw;
}

/********************************************
 * Get the same or the similar matches from the string
 ********************************************/
function getIncludedMatches(arr, word, length) {
  if (!_.isString(word)) {
    return [];
  }
  // User would be able to inject any type of RegEx escape character which would trigger an error
  const format = word.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // Remove all unsafe characters
  const sameMatch = _.filter(arr, function(w) {
    return new RegExp(`${format}`).test(w); // Find the same match
  });
  const similarMatch = _.filter(arr, function(w) {
    return new RegExp(`${format.match(/.{1,2}/g).join('|')}`).test(w);  // Find the similar match
  });
  return [ ...new Set(_.concat(sameMatch, similarMatch)) ].splice(0, length); // Return unique set
}

function getAlliterativeMatches(arr, letter) {
  var check = letter.toLowerCase();
  return _.filter(arr, function(elm) { return elm.substring(0, 1).toLowerCase() === check; });
}
