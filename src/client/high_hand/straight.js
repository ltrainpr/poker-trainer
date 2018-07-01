const _ = require('underscore');

function Straight(cards) {
  let highValue;
  let wheel = false;
  const sortedCards = _.uniq(_.pluck(cards, 'value')).sort((a, b) => (a - b));

  function hasAce() {
    const aceHighValue = 14;
    const lastIndex = sortedCards.length - 1;
    return sortedCards[lastIndex] === aceHighValue;
  }

  function getDataSets() {
    const dataSets = [];
    const copy = sortedCards.slice();

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
        dataSets.push(copy.slice(2, 7));
        break;
      default:
        break;
    }

    return dataSets;
  }

  function isSequential(filteredValues) {
    let nextNumber
    let nextSequentialValue;
    let seq = true;
    const sortedValues = filteredValues || sortedCards;

    for (let i = 0, end = sortedValues.length - 1; i < end; i += 1) {
      if(seq) {
        nextSequentialValue = sortedValues[i] + 1;
        nextNumber = sortedValues[i + 1];

        seq = nextSequentialValue === nextNumber;
      }
    }

    return seq;
  }

  function checkForSequentialDataSets(dataSets) {
    let sequential;
    let results = [];
    results = _.map(dataSets, (dataSet) => {
      sequential = isSequential(dataSet);
      if(sequential) { highValue = dataSet[dataSet.length - 1]; }
      return sequential;
    });

    return _.contains(results, true);
  }

  function checkForStraight() {
    const dataSets = getDataSets();
    return checkForSequentialDataSets(dataSets);
  }

  function isWheel() {
    const copy = sortedCards.slice(0, 5);
    copy.pop();
    copy.unshift(1);
    wheel = isSequential(copy);
    if(wheel) { highValue = 5; }
    return wheel;
  }

  function isStraight() {
    if(hasAce()) {
      return checkForStraight() || isWheel();
    }

    return checkForStraight();
  }

  return {
    isHand: isStraight(),
    isWheel: wheel,
    hand: {
      hand: 'straight',
      value: highValue
    }
  };
};

module.exports = Straight;