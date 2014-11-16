var _ = require('lodash'),
  nouns = require('../src/nouns'),
  adjectives = require('../src/adjectives'),
  helpers = require('./spec-helpers');

describe('nouns', stringArrayTestSuite.bind(this, nouns));
describe('adjectives', stringArrayTestSuite.bind(this, adjectives));

function stringArrayTestSuite(collection) {
  it('is an array', function () {
    expect(helpers.isArray(collection)).toBe(true);
  });

  it('has at least one item', function () {
    expect(collection.length).toBeGreaterThan(0);
  });

  it('has each item as a string', function () {
    var everyItemIsAString = _.every(collection, function (item) {
      return typeof item === 'string';
    });
    expect(everyItemIsAString).toBe(true);
  });

  it('has every item with no spaces', function () {
    var anyItemWithSpaces = _.any(collection, function (item) {
      return item.indexOf(' ') !== -1;
    });
    expect(anyItemWithSpaces).toBe(false);
  });

  it('has every item with no dashes', function () {
    var anyItemWithDashes = _.any(collection, function (item) {
      return item.indexOf('-') !== -1;
    });
    expect(anyItemWithDashes).toBe(false);
  });

}
