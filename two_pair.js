var _ = require('underscore');
var PairHelper = require('./pair_helper');

var twoPair = function(cards) {
  var sortedPairs = {};

  function twoPairs() {
    var pairs = _.pick(cards, (value, key) => { return value.length === 2; });
    if(_.size(pairs) === 0) { return false; }

    sortedPairs = PairHelper.sortKeys(pairs);
    return _.size(pairs) > 1 ? true : false;
  }

  function values() {
    var result = {};

    if(sortedPairs.length === 3) {
      result = {
        hand: 'two pair',
        value: sortedPairs[0],
        bottomPair: sortedPairs[1],
        kicker: sortedPairs[2]
      };
    }

    if(sortedPairs.length === 2) {
      result = {
        hand: 'two pair',
        value: parseInt(sortedPairs[0], 10),
        bottomPair: parseInt(sortedPairs[1], 10)
      };
    }

    return result;
  }

  return _.extendOwn({
    isHand: twoPairs(),
    suit: '',
    kicker: PairHelper.kicker(cards)
  }, values());
};

module.exports = twoPair;