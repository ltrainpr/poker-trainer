var _ = require('underscore');

var Pairs = function(cards) {
  var pairs = _.pick(cards, (value, key) => { return value.length === 2; })

    if(pairs.length === 0) { return false; }

    var higestValuePairs = topPairs(pairs)

    var two = _.findKey(grouped, (value, key) => { return value.length === 2; });

    parseInt(two, 10)   || false

  function topPairs(pairs) {
    var highestValuePairs = sortKeys(pairs);

    if(highestValuePairs.length === 3) { highestValuePairs.shift(); }

    return highestValuePairs;
  }

  function sortKeys(filteredCards) {
    return (
      _.chain(filteredCards)
      .keys()
      .map(function(num) { return parseInt(num, 10); })
      .sort((a,b) => { return a - b; })
      .value()
    )
  }

  return {
    twoPair: twoPair(),
    value: highestValuePair,
    suit: '',
    bottomPair: secondHighestValuePair,
    kicker: kicker()
  }
}

module.exports = Pairs;