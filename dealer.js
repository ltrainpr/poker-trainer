var Shuffler = require("./shuffler");

var Dealer = function(players) {
  var deck = deck || Shuffler();
  var communityCards = [];

  function handIsOver() {
    resetPlayerHands();
    resetCommunityCards();
    resetDeck();
  }

  function resetPlayerHands() {
    players.forEach((player) => { player.hand.length = 0; });
  }

  function resetCommunityCards() { communityCards.length = 0; }
  function resetDeck() { deck = Shuffler(); }

  function currentDeck() { return deck; }
  function getCommunityCards() { return communityCards; }


  return {
    deal:     function(players) {
      players.forEach((player) => {
        player.hand = [deck.pop(), deck.pop()];
      });
    },
    dealFlop: function() {
      if(communityCards.length === 0) {
        for (var i = 3; i > 0; i--) {
          communityCards.push(deck.pop());
        }
      }
    },
    dealNext: function() {
      if(communityCards.length === 3 || communityCards.length === 4) {
        communityCards.push(deck.pop());
      }
    },
    currentDeck: currentDeck,
    communityCards: getCommunityCards,
    nextHand:   handIsOver
  };
};

module.exports = Dealer;