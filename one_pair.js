var _ = require('underscore');
var PairHelper = require('./pair_helper');

var onePair = function(cards) {
  var sortedPairs = {};

  function pair() {
    var pairs = _.pick(cards, (value, key) => { return value.length === 2; });
    if(_.size(pairs) === 0) { return false; }

    sortedPairs = PairHelper.sortKeys(pairs);
    return sortedPairs.length === 1 ? true : false;
  }

  function values() {
    var result = {};

    if( sortedPairs.length === 1) {
      result = {
        hand: 'one pair',
        value: parseInt(sortedPairs[0], 10)
      };
    }

    return result;
  }

  return _.extendOwn({
    isHand: pair(),
    suit: '',
    kicker: PairHelper.kicker(cards)
  }, values());
};

module.exports = onePair;