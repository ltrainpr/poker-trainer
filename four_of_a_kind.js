var _ = require('underscore');

var FourOfAKind = function(groupedCards) {
  var fourValue;

  function isFourOfAKind() {
    fourValue = _.findKey(groupedCards, (value, key) => { return value.length === 4; });

    return fourValue ? true : false;
  }

  return {
    isHand: isFourOfAKind(),
    value:  parseInt(fourValue, 10) || false
  };
};

module.exports = FourOfAKind;