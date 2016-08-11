var _ = require('lodash'),
  nouns = require('../src/nouns'),
  adjectives = require('../src/adjectives'),
  generate = require('../src/generator'),
  expect = require('must');

describe('generator', function () {
  it('has a generate function', function () {
    expect(generate).to.be.a(Function);
  });

  describe('generate', function () {
    describe('when called with no argument', function () {
      var projName;

      beforeEach(function () {
        projName = generate();
      });

      it('returns an object with keys: dashed, spaced, raw', function () {
        expect(projName).to.not.be.undefined();
        expect(projName.dashed).to.not.be.undefined();
        expect(projName.spaced).to.not.be.undefined();
        expect(projName.raw).to.not.be.undefined();
      });

      it('has a property raw which is an array of two strings', function () {
        expect(projName.raw.length).to.be(2);
        expect(typeof projName.raw[0]).to.be('string');
        expect(typeof projName.raw[1]).to.be('string');
      });

      it('has an array raw, the first item of which is from the adjectives array', function () {
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
      });

      it('has an array raw, the second item of which is from the nouns array', function () {
        expect(_.includes(nouns, projName.raw[1])).to.be(true);
      });

      it("has a property dashed, which is a string of raw's items joined with a dash", function () {
        expect(projName.dashed).to.be(projName.raw.join('-'));
      });

      it("has a property spaced, which is a string of raw's items joined with a space", function () {
        expect(projName.spaced).to.be(projName.raw.join(' '));
      });
    });

    describe('when called with an options object', function () {
      var projName;

      it('with {}, shows default behaviour', function () {
        projName = generate({});
        expect(projName.raw.length).to.be(2);
        expect(typeof projName.raw[0]).to.be('string');
        expect(typeof projName.raw[1]).to.be('string');
      });

      it('with {number: true}, includes number', function () {
        projName = generate({number: true});
        expect(projName.raw.length).to.be(3);
        expect(typeof projName.raw[0]).to.be('string');
        expect(typeof projName.raw[1]).to.be('string');
        expect(typeof projName.raw[2]).to.be('number');
      });

      it('with {words: n}, has n-1 adjectives and 1 noun', function () {
        projName = generate({words: 3});
        expect(projName.raw.length).to.be(3);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(adjectives, projName.raw[1])).to.be(true);
        expect(_.includes(nouns, projName.raw[2])).to.be(true);

        projName = generate({words: 5});
        expect(projName.raw.length).to.be(5);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(adjectives, projName.raw[1])).to.be(true);
        expect(_.includes(adjectives, projName.raw[2])).to.be(true);
        expect(_.includes(adjectives, projName.raw[3])).to.be(true);
        expect(_.includes(nouns, projName.raw[4])).to.be(true);
      });

      it('with {words: 3, number: true}, has 2 adjectives, 1 noun and 1 number', function () {
        projName = generate({words: 3, number: true});
        expect(projName.raw.length).to.be(4);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(adjectives, projName.raw[1])).to.be(true);
        expect(_.includes(nouns, projName.raw[2])).to.be(true);
        expect(typeof projName.raw[3]).to.be('number');
      });

      it('with {words: 2, number: false, alliterative: true}, has 1 adjective and 1 noun beginning with same letter', function() {
        projName = generate({words: 2, number: false, alliterative: true});
        expect(projName.raw.length).to.be(2);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(nouns, projName.raw[1])).to.be(true);
        expect(projName.raw[0].substring(0, 1).toLowerCase() === projName.raw[1].substring(0, 1).toLowerCase()).to.be(true);
      });
    });
  });

  describe('legacy generate property', function () {
    it('is also available as a generate property', function () {
      var name = require('../src/generator').generate();
      expect(name.dashed).to.not.be.undefined();
      expect(name.spaced).to.not.be.undefined();
      expect(name.raw).to.not.be.undefined();
    });
  });
});
