var _ = require('underscore');

var Flush = function(cards) {
  var suit;
  var grouped = _.groupBy(cards, (card) => { return card.suit; });

  function isFlush() {
    suit = _.findKey(grouped, (value, key, obj) => {
      return value.length > 4;
    });

    return suit;
  }

  function flushValue() {
    if(suit) {
      return _.max(grouped[suit], (group) => { return group.value; }).value;
    }
  }

  return {
    isHand: isFlush() ? true : false,
    hand:   {
      hand: 'flush',
      suit: suit,
      value: flushValue()
    },
  };
};

module.exports = Flush;