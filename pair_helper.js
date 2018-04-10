var _ = require('underscore');

var PairHelper = (function() {
  return {
    kicker: function(cards) {
      var singles = _.pick(cards, (value, key) => { return value.length === 1; });
      var sortedValues = this.sortKeys(singles);

      return sortedValues[0];
    },

    sortKeys: function(filteredCards) {
      return (
        _.chain(filteredCards)
        .keys()
        .map(function(num) { return typeof num === "string" ? parseInt(num, 10) : num; })
        .sort((a,b) => { return a - b; })
        .reverse()
        .value()
      );
    }
  }
})();

module.exports = PairHelper;