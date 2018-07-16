const Shuffler = require("./shuffler");

function Dealer() {
  let deck = Shuffler();
  const communityCards = [];

  function resetPlayerHands(players) {
    players.forEach((player) => {
      const pokerPlayer = player;
      pokerPlayer.hand.length = 0;
    });
  }

  function resetCommunityCards() { communityCards.length = 0; }
  function resetDeck() { deck = Shuffler(); }

  function handIsOver(players) {
    resetDeck();
    resetPlayerHands(players);
    resetCommunityCards();
  }

  function currentDeck() { return deck; }
  function getCommunityCards() { return communityCards; }
  function deal(players) {
    players.forEach((player) => {
      const pokerPlayer = player;
      pokerPlayer.hand = [deck.pop(), deck.pop()];
    });
  }

  function dealFlop() {
    if(communityCards.length === 0) {
      for (let i = 3; i > 0; i -= 1) {
        communityCards.push(deck.pop());
      }
    }
  }

  function dealNext() {
    if(communityCards.length === 3 || communityCards.length === 4) {
      communityCards.push(deck.pop());
    }
  }

  return {
    deal,
    dealFlop,
    dealNext,
    currentDeck,
    communityCards: getCommunityCards,
    nextHand:   handIsOver
  };
};

module.exports = Dealer;