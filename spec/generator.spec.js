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
      var projName;

      beforeEach(function () {
        projName = generate();
      });

      it('returns an object with keys: dashed, spaced, raw', function () {
        expect(projName).toBeDefined();
        expect(projName.dashed).toBeDefined();
        expect(projName.spaced).toBeDefined();
        expect(projName.raw).toBeDefined();
      });

      it('has a property raw which is an array of two strings', function () {
        expect(projName.raw.length).toBe(2);
        expect(typeof projName.raw[0]).toBe('string');
        expect(typeof projName.raw[1]).toBe('string');
      });

      it('has an array raw, the first item of which is from the adjectives array', function () {
        expect(_.contains(adjectives, projName.raw[0])).toBe(true);
      });

      it('has an array raw, the second item of which is from the nouns array', function () {
        expect(_.contains(nouns, projName.raw[1])).toBe(true);
      });

      it("has a property dashed, which is a string of raw's items joined with a dash", function () {
        expect(projName.dashed).toBe(projName.raw.join('-'));
      });

      it("has a property spaced, which is a string of raw's items joined with a space", function () {
        expect(projName.spaced).toBe(projName.raw.join(' '));
      });
    });

    describe('when called with an options object', function () {
      var projName;

      it('with {}, shows default behaviour', function () {
        projName = generate({});
        expect(projName.raw.length).toBe(2);
        expect(typeof projName.raw[0]).toBe('string');
        expect(typeof projName.raw[1]).toBe('string');
      });

      it('with {number: true}, includes number', function () {
        projName = generate({number: true});
        expect(projName.raw.length).toBe(3);
        expect(typeof projName.raw[0]).toBe('string');
        expect(typeof projName.raw[1]).toBe('string');
        expect(typeof projName.raw[2]).toBe('number');
      });

      it('with {words: n}, has n-1 adjectives and 1 noun', function () {
        projName = generate({words: 3});
        expect(projName.raw.length).toBe(3);
        expect(_.contains(adjectives, projName.raw[0])).toBe(true);
        expect(_.contains(adjectives, projName.raw[1])).toBe(true);
        expect(_.contains(nouns, projName.raw[2])).toBe(true);

        projName = generate({words: 5});
        expect(projName.raw.length).toBe(5);
        expect(_.contains(adjectives, projName.raw[0])).toBe(true);
        expect(_.contains(adjectives, projName.raw[1])).toBe(true);
        expect(_.contains(adjectives, projName.raw[2])).toBe(true);
        expect(_.contains(adjectives, projName.raw[3])).toBe(true);
        expect(_.contains(nouns, projName.raw[4])).toBe(true);
      });

      it('with {words: 3, number: true}, has 2 adjectives, 1 noun and 1 number', function () {
        projName = generate({words: 3, number: true});
        expect(projName.raw.length).toBe(4);
        expect(_.contains(adjectives, projName.raw[0])).toBe(true);
        expect(_.contains(adjectives, projName.raw[1])).toBe(true);
        expect(_.contains(nouns, projName.raw[2])).toBe(true);
        expect(typeof projName.raw[3]).toBe('number');
      });
    });
  });
});
