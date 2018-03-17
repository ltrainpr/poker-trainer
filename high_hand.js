var _ = require('underscore');
var Flush = require('./flush');
var Straight = require('./straight');
var FourOfAKind = require('./four_of_a_kind');

var HighHand = function (cards) {
  var myCurrentHand = {};

  function evaluate() {
    var fourOfAKind = FourOfAKind(cards);
    var fullHouse = isFullHouse(cards);

    if(flushOrStraight()) { return myCurrentHand; };

    if(fourOfAKind.isHand) {
      myCurrentHand.hand = 'four of a kind';
      myCurrentHand.suit = '';
      myCurrentHand.value = parseInt(fourOfAKind.value);
    }

    if(fullHouse.isHand) {
      myCurrentHand.hand = 'full house';
      myCurrentHand.suit = '';
      myCurrentHand.value = parseInt(fullHouse.value),
      myCurrentHand.bottomPair = parseInt(fullHouse.bottomPair)
    }

    return myCurrentHand;
  }

  function isFullHouse(cards) {
    var grouped = _.groupBy(cards, (obj) => { return obj.value; });

    var threeValue = _.findKey(grouped, (value, key) => { return value.length === 3; });

    var twoValue = _.findKey(grouped, (value, key) => { return value.length === 2; });

    return {
      isHand: threeValue && twoValue,
      value:  threeValue,
      bottomPair: twoValue
    }
  }

  function flushOrStraight() {
    var flush = Flush(cards);
    var straight = Straight(cards);

    if(straight.isHand && flush.isHand) {
      return myCurrentHand = {
        hand: 'straight flush',
        suit: flush.suit,
        value: highestCardValue()
      };
    } else if(flush.isHand) {
      return myCurrentHand = {
        hand: 'flush',
        suit: flush.suit,
        value: highestCardValue()
      };
    } else if(straight.isHand) {
      return myCurrentHand = {
        hand: 'straight',
        suit: '',
        value: highestCardValue()
      };
    }

    return false;
  }

  function highestCardValue() {
    return _.max(cards, (hashmap) => { return hashmap.value; }).value;
  }

  return {
    myCurrentHighHand: evaluate()
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


