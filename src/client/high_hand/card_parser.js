var CardParser = function (cards) {
  const LOOKUP = { "J": 11, "Q": 12, "K":  13, "A": 14 }
  var cards, myHand, communityCards, myHandCombined

  function initialize() {
    myHand = cards[0].split(" ") || [];
    communityCards = cards[1].split(" ") || [];
    return {
      cards: cards,
      myHand: myHand,
      communityCards: communityCards,
      myHandCombined: myHand.concat(communityCards)
    }
  }

  function parse() {
    var str, suit;
    var state = initialize();
    return state.myHandCombined.map(function (card) {
      [str, suit] = card.split("_")
      var value = parseInt(str) > 0 ? parseInt(str) : LOOKUP[str]
      return { value: value, suit: suit.toLowerCase() }
    })
  }

  return {
    parse: parse()
  }
}

module.exports = CardParser;