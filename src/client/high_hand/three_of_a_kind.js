const _ = require('underscore');

function ThreeOfAKind(groupedCards) {
  let highValue;
  let lowValue = null;

  function setHighLowValues(values) {
    const val = _.keys(values);

    switch(val.length) {
      case 2:
        val.sort((a,b) => a - b );
        highValue = parseInt(val[1], 10);
        lowValue = parseInt(val[0], 10);
        break;
      case 1:
        highValue = parseInt(val[0], 10);
        break;
      default:
        break;
    }
  }

  function isThreeOfAKind() {
    const threeValues = _.pick(groupedCards, (value) => value.length === 3 );

    if(_.size(threeValues)) { setHighLowValues(threeValues); }

    return !_.isEmpty(threeValues);
  }

  return {
    isHand: isThreeOfAKind(),
    hand: {
      hand:   'three of a kind',
      value:  highValue || false,
    },
    bottomPair: lowValue
  };
};

module.exports = ThreeOfAKind;