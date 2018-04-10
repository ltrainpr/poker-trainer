var _ = require('underscore');

var Pairs = function(cards) {
  var sortedPairs;

  function twoPair() {
    var pairs = _.pick(cards, (value, key) => { return value.length === 2; });
    if(_.size(pairs) === 0) { return false; }

    sortedPairs = sortKeys(pairs);
    return _.size(pairs) > 1 ? true : false;
  }

  function sortKeys(filteredCards) {
    return (
      _.chain(filteredCards)
      .keys()
      .map(function(num) { return typeof num === "string" ? parseInt(num, 10) : num; })
      .sort((a,b) => { return a - b; })
      .reverse()
      .value()
    );
  }

  function values() {
    var result = {};
    if(_.isUndefined(sortedPairs)) { return result; }

    if(sortedPairs.length === 3) {
      result = {
        hand: 'two pair',
        value: sortedPairs[0],
        bottomPair: sortedPairs[1],
        kicker: sortedPairs[2]
      };
    } else if(sortedPairs.length === 2) {
      result = {
        hand: 'two pair',
        value: parseInt(sortedPairs[0], 10),
        bottomPair: parseInt(sortedPairs[1], 10)
      };
    } else if(sortedPairs.length === 1) {
      result = {
        hand: 'one pair',
        value: parseInt(sortedPairs[0], 10)
      };
    }

    return result;
  }

  function kicker() {
    var singles = _.pick(cards, (value, key) => { return value.length === 1; });
    var sortedValues = sortKeys(singles);

    return sortedValues[0];
  }

  return _.extendOwn({
    twoPair: twoPair(),
    suit: '',
    kicker: kicker()
  }, values());
};

module.exports = Pairs;