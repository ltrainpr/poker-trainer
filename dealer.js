var Game = require("./game");
var Shuffler = require("./shuffler");

var Dealer = function() {
  var players = Game.players;
  var button = button || Game.button;
  var deck = deck || Shuffler();
  var communityCards = [];

  function playerToAct() {
    var sum = button + 3;

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

  function handIsOver() {
    resetPlayerHands();
    resetCommunityCards();
    resetDeck();
    moveButton();
  }

  function resetPlayerHands() {
    players.forEach((player) => { player.hand.length = 0; })
  }
  function resetCommunityCards() { communityCards.length = 0; }
  function resetDeck() { deck = Shuffler(); }
  function moveButton() { button = button === 9 ? 0 : button + 1; }

  function currentDeck() { return deck; }
  function getCommunityCards() { return communityCards; }
  function getButton() { return button; }


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
    currentDeck: currentDeck,
    button: getButton,
    action: players[playerToAct()],
    communityCards: getCommunityCards,
    nextHand:   handIsOver
  }
}

module.exports = Dealer