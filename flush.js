var _ = require('underscore');

var Flush = function(cards) {
  var suit;

  function isFlush() {
    suit = cards[0].suit;
    return _.all(cards, (card) => { return card.suit === suit; });
  }

  return {
    isFlush: isFlush(),
    suit: suit
  }
}

module.exports = Flush;