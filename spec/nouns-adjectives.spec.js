var _ = require('lodash'),
  nouns = require('../src/nouns'),
  adjectives = require('../src/adjectives'),
  helpers = require('./spec-helpers'),
  expect = require('must');

describe('nouns', stringArrayTestSuite.bind(this, nouns));
describe('adjectives', stringArrayTestSuite.bind(this, adjectives));

function stringArrayTestSuite(collection) {
  it('is an array', function () {
    expect(helpers.isArray(collection)).to.be(true);
  });

  it('has at least one item', function () {
    expect(collection.length).to.be.gt(0);
  });

  it('has each item as a string', function () {
    var everyItemIsAString = _.every(collection, function (item) {
      return typeof item === 'string';
    });
    expect(everyItemIsAString).to.be(true);
  });

  it('has every item with no spaces', function () {
    var anyItemWithSpaces = _.some(collection, function (item) {
      return item.indexOf(' ') !== -1;
    });
    expect(anyItemWithSpaces).to.be(false);
  });

  it('has every item with no dashes', function () {
    var anyItemWithDashes = _.some(collection, function (item) {
      return item.indexOf('-') !== -1;
    });
    expect(anyItemWithDashes).to.be(false);
  });

}
