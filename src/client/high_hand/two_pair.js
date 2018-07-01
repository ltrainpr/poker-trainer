const _ = require('underscore');
const PairHelper = require('./pair_helper');

function twoPair(cards) {
  let sortedPairs = {};

  function twoPairs() {
    const pairs = _.pick(cards, (value) => value.length === 2);
    if(_.size(pairs) === 0) { return false; }

    sortedPairs = PairHelper.sortKeys(pairs);
    return _.size(pairs) > 1;
  }

  function values() {
    let result = {};

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

  return {
    isHand: twoPairs(),
    hand:   _.extendOwn({
              suit: '',
              kicker: PairHelper.kicker(cards)
            }, values())
  };
};

module.exports = twoPair;