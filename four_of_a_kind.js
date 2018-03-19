var _ = require('underscore');

var FourOfAKind = function(cards) {
  var fourValue;

  function isFourOfAKind() {
    fourValue = _.chain(cards)
    .groupBy((obj) => { return obj.value; })
    .findKey((value, key) => { return value.length === 4; })
    .value()

    return fourValue ? true : false;
  }

  return {
    isHand: isFourOfAKind(),
    value:  fourValue
  }
}

module.exports = FourOfAKind;