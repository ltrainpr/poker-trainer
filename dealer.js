var Game = require("./game");
var Shuffler = require("./shuffler");

var Dealer = function() {
  var players = Game.players;
  var button = button || Game.button;
  var deck = deck || Shuffler();
  var communityCards = [];

  function playerToAct() {
    var sum = button +3;

    switch (sum) {
      case 10:
        return 0;
      case 11:
        return 1;
      case 12:
        return 2;
      default:
        return sum;
    }
  }

  return {
    deal:     function() {
      players.forEach((player) => {
        player.hand = [deck.pop(), deck.pop()];
      });
    },
    dealFlop: function() {
      if(communityCards.length === 0) {
        for (var i = 3; i > 0; i--) {
          communityCards.push(deck.pop());
        };
      }
    },
    dealNext: function() {
      if(communityCards.length === 3 || communityCards.length === 4) {
        communityCards.push(deck.pop());
      }
    },
    currentDeck: deck,
    action: players[playerToAct()],
    communityCards: communityCards
  }
}

module.exports = Dealer