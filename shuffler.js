var _ = require('underscore');

var ShuffledDeck = function() {
  var unDealtDeck = unDealtDeck || newDeck()

  function newDeck() {
    var result = [];
    var suits = ['hearts', 'clubs', 'spades', 'diamonds'];
    suits.forEach((suit) => {
      for(value = 2; value < 15; value++) {
        result.push({
          value: value,
          suit: suit
        })
      }
    });

    return result;
  }

  return _.chain(unDealtDeck.slice())
          .shuffle()
          .shuffle()
          .shuffle()
          .value();
};


module.exports = ShuffledDeck