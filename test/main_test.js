
var assert = require("assert")
require('../main.js');

describe('Number', function(){
  var n;

  describe('#toWords()', function(){
    it('returns "zero" if given a zero', function(){
      n = 0;
      assert.equal(n.toWords(), 'zero')
    });

    it('returns "ten" when given a ten', function() {
      n = 10;
      assert.equal(n.toWords(), 'ten');
    });

    it('returns t(w)eens properly', function() {
      n = 11;
      assert.equal(n.toWords(), 'eleven');

      n = 17;
      assert.equal(n.toWords(), 'seventeen');      
    });

    it('identifies hundreds', function() {
      var output;
      n = 245;

      output = n.toWords();
      assert(output.match('two hundred'));

      n = 745;

      output = n.toWords();
      assert(output.match('seven hundred'));
    });

    it('identifies all elements of magnitude with nonzero elements', function() {
      n = 400500000;
      assert.equal(n.toWords(), "four hundred million five hundred thousand");
    });

    it('handles longer numbers than javascript can without resorting to trickery', function() {
      n = 1000000000000000000000000000000000000000000000; // 1e+45

      assert.equal(n.toWords(), 'one quattuordecillion');
    });

    it('knows about negative numbers', function() {
      n = -12;
      assert.equal(n.toWords(), 'negative twelve');

      n = -1000000000000000000000000000000000000000000000;
      assert.equal(n.toWords(), 'negative one quattuordecillion');
    })
  });
});
