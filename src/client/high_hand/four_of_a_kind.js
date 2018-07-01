const _ = require('underscore');

function FourOfAKind(groupedCards) {
  let fourValue;

  function isFourOfAKind() {
    fourValue = _.findKey(groupedCards, (value) => value.length === 4 );

    return fourValue !== undefined;
  }

  return {
    isHand: isFourOfAKind(),
    hand:   {
      hand:   'four of a kind',
      value:  parseInt(fourValue, 10) || false
    }
  };
};

module.exports = FourOfAKind;