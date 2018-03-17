var _ = require('underscore');
var Straight = function(cards) {
  function isStraight() {
    var sortedCards = _.pluck(cards, 'value').sort((a, b) => (a - b));
    return isSequential(sortedCards)
  }

  function isSequential(sortedCards) {
    var seq = true;
    for (var i = sortedCards.length - 1; i > 0; i--) {
      if(seq) {
        seq = (sortedCards[i] - 1) === sortedCards[i - 1]
      }
    };

    return seq;
  }

  return {
    isHand: isStraight()
  }
}

module.exports = Straight;