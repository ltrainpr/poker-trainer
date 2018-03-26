var _ = require('underscore');

var Straight = function(cards) {
  var wheel = false;

  function isStraight() {
    var sortedCards = _.pluck(cards, 'value').sort((a, b) => (a - b));
    var checkForWheel = hasAce(sortedCards);
    if(checkForWheel) {
      return isSequential(sortedCards) || isWheel(sortedCards);
    } else {
      return isSequential(sortedCards);
    }
  }

  function hasAce(sortedCards) {
    var aceHighValue = 14;
    var lastIndex = sortedCards.length - 1;
    return sortedCards[lastIndex] === aceHighValue;
  }

  function isSequential(sortedCards) {
    var nextNumber, nextSequentialValue;
    var seq = true;

    for (var i = 0, end = sortedCards.length - 1; i < end; i++) {
      if(seq) {
        nextSequentialValue = sortedCards[i] + 1;
        nextNumber = sortedCards[i + 1];

        seq = nextSequentialValue === nextNumber;
      }
    };

    return seq;
  }

  function isWheel(sortedCards) {
    var copy = sortedCards.slice();
    copy.pop();
    copy.unshift(1);
    wheel = isSequential(copy);
    return wheel;
  }

  return {
    isHand: isStraight(),
    isWheel: wheel
  }
}

module.exports = Straight;