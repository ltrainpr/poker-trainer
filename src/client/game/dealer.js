const Shuffler = require("./shuffler");
const HighHand = require("../high_hand/high_hand")

function Dealer() {
  let deck = Shuffler();
  const communityCards = [];
  const PreFlop = 'preFlop';
  const Flop    = 'flop';
  const Turn    = 'turn';
  const River   = 'river';

  function resetPlayerHands(players) {
    players.forEach((player) => {
      const pokerPlayer = player;
      pokerPlayer.hand.length = 0;
    });
  }

  function resetCommunityCards() { communityCards.length = 0; }
  function resetDeck() { deck = Shuffler(); }
  function currentDeck() { return deck; }
  function getCommunityCards() { return communityCards; }

  function deal(players) {
    players.forEach((player) => {
      const pokerPlayer = player;
      pokerPlayer.hand = [deck.pop(), deck.pop()];
    });
  }

  function handIsOver(players) {
    resetDeck();
    resetPlayerHands(players);
    resetCommunityCards();
    deal(players);
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

  function evaluateHands(players) {
    const commonCards = getCommunityCards();
    return players.map(player => {
      const cards = player.hand.concat(commonCards);
      return {highHand: HighHand(cards), cards: player.hand};
    })
  }

  function nextRound(round) {
    switch(round) {
      case PreFlop:
        dealFlop();
        return Flop;
      case Flop:
        dealNext();
        return Turn;
      case Turn:
        dealNext();
        return River;
      default:
        return PreFlop;
    }
  }

  return {
    deal,
    dealFlop,
    dealNext,
    currentDeck,
    communityCards: getCommunityCards,
    nextHand:   handIsOver,
    evaluateHands,
    nextRound
  };
};

module.exports = Dealer;