var _ = require('underscore');

var Straight = function(cards) {
  var highValue;
  var wheel = false;
  var sortedCards = _.uniq(_.pluck(cards, 'value')).sort((a, b) => (a - b));

  function isStraight() {
    if(hasAce()) {
      return checkForStraight() || isWheel();
    } else {
      return checkForStraight();
    }
  }

  function hasAce() {
    var aceHighValue = 14;
    var lastIndex = sortedCards.length - 1;
    return sortedCards[lastIndex] === aceHighValue;
  }

  function isSequential(filteredValues) {
    var nextNumber, nextSequentialValue;
    var seq = true;
    var sortedValues = filteredValues || sortedCards;

    for (var i = 0, end = sortedValues.length - 1; i < end; i++) {
      if(seq) {
        nextSequentialValue = sortedValues[i] + 1;
        nextNumber = sortedValues[i + 1];

        seq = nextSequentialValue === nextNumber;
      }
    };

    return seq;
  }

  function checkForStraight() {
    var dataSets = getDataSets();
    return checkForSequentialDataSets(dataSets);
  }

  function getDataSets() {
    var first;
    var dataSets = [];
    var copy = sortedCards.slice();

    switch(sortedCards.length) {
      case 5:
        dataSets.push(copy);
        break;
      case 6:
        dataSets.push(copy.slice(0, 5));
        dataSets.push(copy.slice(1, 6));
        break;
      case 7:
        dataSets.push(copy.slice(0, 5));
        dataSets.push(copy.slice(1, 6));
        dataSets.push(copy.slice(2, 7))
        break;
      default:
        return;
    }

    return dataSets;
  }

  function checkForSequentialDataSets(dataSets) {
    var sequential;
    var results = [];
    results = _.map(dataSets, (dataSet) => {
      sequential = isSequential(dataSet)
      if(sequential) { highValue = dataSet[dataSet.length - 1]}
      return sequential;
    })

    return _.contains(results, true)
  }

  function isWheel() {
    var copy = sortedCards.slice(0, 5);
    copy.pop();
    copy.unshift(1);
    wheel = isSequential(copy);
    if(wheel) { highValue = 5; }
    return wheel;
  }

  return {
    isHand: isStraight(),
    isWheel: wheel,
    value: highValue
  }
}

module.exports = Straight;