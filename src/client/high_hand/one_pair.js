const _ = require('underscore');
const PairHelper = require('./pair_helper');

function onePair(cards) {
  let sortedPairs = {};

  function pair() {
    const pairs = _.pick(cards, (value) => value.length === 2);
    if(_.size(pairs) === 0) { return false; }

    sortedPairs = PairHelper.sortKeys(pairs);
    return sortedPairs.length === 1;
  }

  function values() {
    let result = {};

    if( sortedPairs.length === 1) {
      result = {
        hand: 'one pair',
        value: parseInt(sortedPairs[0], 10)
      };
    }

    return result;
  }

  return {
    isHand: pair(),
    hand:   _.extendOwn({
              suit: '',
              kicker: PairHelper.kicker(cards)
            }, values())
  };
};

module.exports = onePair;