var Game = require("./game");
var Shuffler = require("./shuffler");

var Dealer = function() {
  var players = Game.players
  var deck = deck || Shuffler();

  return {
    deal:   function() {
      players.forEach((player) => {
        player.hand = [deck.pop(), deck.pop()];
      });
    },
    currentDeck: deck
  }
}

module.exports = Dealer