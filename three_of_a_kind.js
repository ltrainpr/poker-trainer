var _ = require('underscore');

var ThreeOfAKind = function(groupedCards) {
  var highValue;
  var lowValue = null;

  function isThreeOfAKind() {
    threeValues = _.pick(groupedCards, (value, key) => { return value.length === 3; });

    if(_.size(threeValues)) { setHighLowValues(threeValues); }

    return !_.isEmpty(threeValues);
  }

  function setHighLowValues(values) {
    var val = _.keys(values);

    switch(val.length) {
      case 2:
        val.sort((a,b) => { return a - b; });
        highValue = parseInt(val[1], 10);
        lowValue = parseInt(val[0], 10);
        break;
      case 1:
        highValue = parseInt(val[0], 10);
        break;
      default:
        return;
    }
  }

  return {
    isHand: isThreeOfAKind(),
    value:  highValue || false,
    bottomPair: lowValue
  };
};

module.exports = ThreeOfAKind;