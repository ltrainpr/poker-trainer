var _ = require('underscore');
var Flush = require('./flush');

var HighHand = function (cards) {
    var myCurrentHand = {};
    var suit, fourValue;

  function evaluate() {
    var flush = Flush(cards);
    if(flush.isFlush) {
      myCurrentHand.hand = 'flush';
      myCurrentHand.suit = flush.suit;
    }

    if(isStraight()) {
      myCurrentHand.hand = 'straight';
      myCurrentHand.suit = '';
    }

    if(isStraight() && flush.isFlush) {
      myCurrentHand.hand = 'straight flush';
      myCurrentHand.suit = flush.suit;
    }

    myCurrentHand.value = highestCardValue();

    if(isFourOfAKind()) {
      myCurrentHand.hand = 'four of a kind';
      myCurrentHand.suit = '';
      myCurrentHand.value = parseInt(fourValue);
    }

    return myCurrentHand;
   }

   function isFourOfAKind() {
    fourValue = _.chain(cards)
    .groupBy((obj) => { return obj.value; })
    .findKey((value, key) => { return value.length === 4; })
    .value()

     return fourValue ? true : false
   }

  function highestCardValue() {
    return _.max(cards, (hashmap) => { return hashmap.value; }).value;
  }

  function isStraight() {
    var sortedCards = _.pluck(cards, 'value').sort((a, b) => (a - b));
    return isSequential(sortedCards)
  }

  function isSequential(sortedCards) {
    var seq = true;
    for (var i = sortedCards.length - 1; i > 0; i--) {
      if(seq) {
        seq = (sortedCards[i] - 1) === sortedCards[i - 1]
      }
    };

    return seq;
  }

  return {
    myCurrentHighHand: setFlush()
  }
}


module.exports = HighHand;
/*Combine sets, parse all cards into array of hashmap 2-14 value and suit.

Is it a flush?
  - Iterate over hashmaps check if all suits are same.
  - If yes, then are the values sequential (is it a straight, see below).
  - Set flush variable to true/false.
  - If flush: true:
    - Set myCurrentHand to hashmap to: hand: 'flush', value: <highest value>, suit: <suit>, suit: <suit>
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


