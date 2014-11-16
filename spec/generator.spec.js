var _ = require('lodash'),
  nouns = require('../src/nouns'),
  adjectives = require('../src/adjectives'),
  generator = require('../src/generator');

describe('generator', function () {
  it('has a generate function', function () {
    expect(typeof generator.generate).toBe('function');
  });

  describe('generate', function () {

    var generate = generator.generate;

    describe('when called with no argument', function () {

      var appName;

      beforeEach(function () {
        appName = generate();
      });

      it('returns an object with keys: dashed, spaced, raw', function () {
        expect(appName).toBeDefined();
        expect(appName.dashed).toBeDefined();
        expect(appName.spaced).toBeDefined();
        expect(appName.raw).toBeDefined();
      });

      it('has a property raw which is an array of two strings', function () {
        expect(appName.raw.length).toBe(2);
        expect(typeof appName.raw[0]).toBe('string');
        expect(typeof appName.raw[1]).toBe('string');
      });

      it('has an array raw, the first item of which is from the adjectives array', function () {
        expect(_.contains(adjectives, appName.raw[0])).toBe(true);
      });

      it('has an array raw, the second item of which is from the nouns array', function () {
        expect(_.contains(nouns, appName.raw[1])).toBe(true);
      });

      it("has a property dashed, which is a string of raw's items joined with a dash", function () {
        expect(appName.dashed).toBe(appName.raw.join('-'));
      });

      it("has a property spaced, which is a string of raw's items joined with a space", function () {
        expect(appName.spaced).toBe(appName.raw.join(' '));
      });

    });

    describe('when called with a truthy value as the sole argument', function () {

      var appName;

      beforeEach(function () {
        appName = generate(true);
      });

      it('has a property raw which is an array of two strings and a number', function () {
        expect(appName.raw.length).toBe(3);
        expect(typeof appName.raw[0]).toBe('string');
        expect(typeof appName.raw[1]).toBe('string');
        expect(typeof appName.raw[2]).toBe('number');
      });

      it('has an array raw, the third item of which is a number from 1 to 9999', function () {
        var num = appName.raw[2];
        expect(num).toBeDefined();
        expect(num).toBeLessThan(10000);
        expect(num).toBeGreaterThan(0);
      });

      it("has a property dashed, which is a string of raw's items joined with a dash", function () {
        expect(appName.dashed).toBe(appName.raw.join('-'));
      });

      it("has a property spaced, which is a string of raw's items joined with a space", function () {
        expect(appName.spaced).toBe(appName.raw.join(' '));
      });

      it('has the third item in "raw", when called with other truthy values', function () {
        _.each([generate(1), generate('something'), generate({one: 1})],
          function (appName) {
            expect(typeof appName.raw[2]).toBe('number');
          });
      });
    });

    describe('when called with a falsey value as the sole argument', function () {
      var appName;

      beforeEach(function () {
        appName = generate(false);
      });

      it('has a property raw with only two string items', function () {
        expect(appName.raw.length).toBe(2);
        expect(typeof appName.raw[0]).toBe('string');
        expect(typeof appName.raw[1]).toBe('string');
      });

      it('has only two items in "raw", when called with other falsey values', function () {
        _.each([generate(0), generate(''), generate(null)],
          function (appName) {
            expect(appName.raw.length).toBe(2);
          });
      });
    });
  });
})


