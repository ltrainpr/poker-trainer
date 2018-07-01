const _ = require('underscore');

function PairHelper() {
  function kicker(cards) {
    const singles = _.pick(cards, value => value.length === 1);
    const sortedValues = this.sortKeys(singles);

    return sortedValues[0];
  }

  function sortKeys(filteredCards) {
    return (
      _.chain(filteredCards)
      .keys()
      .map((num) => typeof num === "string" ? parseInt(num, 10) : num )
      .sort((a,b) => a - b )
      .reverse()
      .value()
    );
  }


  return {
    kicker,
    sortKeys
  };
};

module.exports = PairHelper();