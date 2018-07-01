function CardParser(cards) {
  const LOOKUP = { "J": 11, "Q": 12, "K":  13, "A": 14 }
  let myHand
  let communityCards

  function initialize() {
    myHand = cards[0].split(" ") || [];
    communityCards = cards[1].split(" ") || [];
    return {
      cards,
      myHand,
      communityCards,
      myHandCombined: myHand.concat(communityCards)
    }
  }

  function parse() {
    let str
    let suit;
    const state = initialize();
    return state.myHandCombined.map((card) => {
      [str, suit] = card.split("_")
      const value = parseInt(str, 10) > 0 ? parseInt(str, 10) : LOOKUP[str]
      return { value, suit: suit.toLowerCase() }
    })
  }

  return {
    parse: parse()
  }
}

module.exports = CardParser;