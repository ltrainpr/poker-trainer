var _ = require('underscore');
var Straight = function(cards) {
  var wheel = false;
  function isStraight() {
    var sortedCards = _.pluck(cards, 'value').sort((a, b) => (a - b));
    var checkForWheel = hasAce(sortedCards);
    if(checkForWheel) {
      var copy = sortedCards.slice();
      copy.pop();
      copy.unshift(1);
      wheel = isSequential(copy);
      return isSequential(sortedCards) || wheel;
    } else {
      return isSequential(sortedCards);
    }
  }

  function hasAce(sortedCards) {
    var aceHighValue = 14;
    return sortedCards[sortedCards.length - 1] === aceHighValue;
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
    isHand: isStraight(),
    isWheel: wheel
  }
}

module.exports = Straight;