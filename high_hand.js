var _ = require('underscore');

var CardParser = function (cards, _) {
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
/*Combine sets, parse all cards into array of hashmap 2-14 value and suit.

Is it a flush?
  - Iterate over hashmaps check if all suits are same.
  - If yes, then are the values sequential (is it a straight, see below).
  - Set flush variable to true/false.
  - If flush: true:
    - Set my_current_hand to hashmap to: hand: 'flush', value: <highest value>, suit: <suit>, suit: <suit>
Is it a straight?
  - Pluck all values.  Set card_values variable to plucked values and then sort.
  - Iterate over all values and check if they are sequential.
  - Check for wheel.  Are 2-5 and Ace are present.
  - Set straight variable to true/false.
  - If flush value is true.
    - Set my_current_hand hashmap to: hand: 'straight flush', value: <unchanged, same value as flush>, suit: <suit>
  - If straight value is true and flush is false then:
    - Set my_current_hand hashmap to: hand: 'straight', value: <higest value>, suit: <suit>

Is it 4 of kind?
  - Return false if flush or straight variables are true.
  - Pluck all suits.
  - Iterate over all values and check if 4 of 5 values are the same.
    - If true set my_current_hand hashmap to: hand: 'four of a kind', value: <value/number of 4 of a kind>, suit: <suit>
    - If 3 values are the same set my_current_hand  hash map to: hand: 'three of a kind', value: <value/number of 3 of a kind>, suit: <suit>
Is it a full house?
  - If my_current_hand hashmap has a hand of 'three of a kind' then check to see if the remaining 2 values match.
  - If true set my_current_hand hashmap to: hand: 'full house', value: <same value/number of 3 of a kind>, suit: <suit>
Is it 3 of a kind?
  - Return true if my_current_hand hashmap hand value is 'three of a kind'.
How many pairs?
  - Use group_by on array.  Iterate over hash map and append push the key into pairs array variable that have value array size of 2.  Append the other values to the kicker variable.
  - Sort pairs and kicker arrays.
  - If array length is 1. Then set my_current_hand to: hand: '1 pair', value: <pairs[-1]>, kicker: <kicker[-1]>, suit: <suit>
  - If array length is 2. Then set my_current_hand to: hand: '2 pair', value: <pairs[-1]>, bottom_pair: <pairs[-2]>, kicker: <kicker[-1]>, suit: <suit>
What's the high card?*/


