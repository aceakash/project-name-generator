var _ = require('lodash'),
  nouns = require('../src/nouns'),
  adjectives = require('../src/adjectives'),
  generate = require('../src/generator'),
  fruits = require('../src/fruits'),
  thailand_provinces = require('../src/thailand_provinces'),
  breads = require('../src/breads'),
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
        expect(projName.dot).to.not.be.undefined();
        expect(projName.under_scored).to.not.be.undefined();
        expect(projName.camelcase).to.not.be.undefined();
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

      it("has a property dot, which is a string of raw's items joined with a dot", function () {
        expect(projName.dot).to.be(projName.raw.join('.'));
      });

      it("has a property under_scored, which is a string of raw's items joined with an underscored", function () {
        expect(projName.under_scored).to.be(projName.raw.join('_'));
      });

      it("has a property camlecase, which is a string of raw's items joined and camelcase formatted", function () {
        expect(projName.camelcase).to.be(generate.camelCase(projName.raw));
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

      it('with {words: 2, number: false, alliterative: "d"}, has 1 adjective and 1 noun beginning with the letter "d"', function() {
        projName = generate({words: 2, number: false, alliterative: 'd'});
        expect(projName.raw.length).to.be(2);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(nouns, projName.raw[1])).to.be(true);
        expect(projName.raw[0].substring(0, 1).toLowerCase() === 'd').to.be(true);
        expect(projName.raw[1].substring(0, 1).toLowerCase() === 'd').to.be(true);
      });

      it('with {words: 2, number: false, alliterative: false, vocab: \'fruits\'}, has 1 adjective and 1 noun that is from fruits', function() {
        projName = generate({words: 2, number: false, alliterative: false, vocab: 'fruits'});
        expect(projName.raw.length).to.be(2);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(fruits, projName.raw[1])).to.be(true);
      });

      it('with {words: 2, number: false, alliterative: false, vocab: \'breads\'}, has 1 adjective and 1 noun that is from breads', function() {
        projName = generate({words: 2, number: false, alliterative: false, vocab: 'breads'});
        expect(projName.raw.length).to.be(2);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(breads, projName.raw[1])).to.be(true);
      });      

      it('with {words: 2, number: false, alliterative: false, geo: \'default\'},' + 
         ' has 1 adjective and 1 noun that is from thailand provinces', function() {
        projName = generate({words: 2, number: false, alliterative: false, geo: 'default'});
        expect(projName.raw.length).to.be(2);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(thailand_provinces, projName.raw[1].replace(/-/g, ' '))).to.be(true);
      });

      it('with {words: 2, number: false, alliterative: false, geo: \'numbers\'},' + 
         ' has 1 adjective and 1 noun that is from thailand provinces' + 
         ' ended with number', function() {
        projName = generate({words: 2, number: false, alliterative: false, geo: 'numbers'});
        expect(projName.raw.length).to.be(3);
        expect(_.includes(adjectives, projName.raw[0])).to.be(true);
        expect(_.includes(thailand_provinces, projName.raw[1].replace(/-/g, ' '))).to.be(true);
        expect(typeof projName.raw[2]).to.be('number');
      });
    });
  });

  describe('legacy generate property', function () {
    it('is also available as a generate property', function () {
      var name = require('../src/generator').generate();
      expect(name.dashed).to.not.be.undefined();
      expect(name.spaced).to.not.be.undefined();
      expect(name.raw).to.not.be.undefined();
      expect(name.camelcase).to.not.be.undefined();
    });
  });
});
