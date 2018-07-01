const _ = require('underscore');

function Flush(cards) {
  let suit;
  const grouped = _.groupBy(cards, card => card.suit );

  function isFlush() {
    suit = _.findKey(grouped, (value) => value.length > 4 );

    return suit !== undefined;
  }

  function flushValue() {
    if(suit) {
      return _.max(grouped[suit], group => group.value ).value;
    }

    return false;
  }

  return {
    isHand: isFlush(),
    hand:   {
      hand: 'flush',
      suit,
      value: flushValue()
    },
  };
};

module.exports = Flush;