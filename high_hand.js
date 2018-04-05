var _ = require('underscore');
var Flush = require('./flush');
var Straight = require('./straight');
var FourOfAKind = require('./four_of_a_kind');
var ThreeOfAKind = require('./three_of_a_kind');
var Pairs = require('./pairs');

var HighHand = function (cards) {
  var myCurrentHand = {};
  var grouped = _.groupBy(cards, (obj) => { return obj.value; });

  function evaluate() {
    var fourOrThreeOfAKindOrFullHouse, twoPair;
    var flushOrStraight = isFlushOrStraight();

    if(flushOrStraight) { return flushOrStraight; }

    fourOrThreeOfAKindOrFullHouse = isFourOrThreeOfAKindOrFullHouse();

    if(fourOrThreeOfAKindOrFullHouse) { return fourOrThreeOfAKindOrFullHouse; }

    twoPair = oneOrTwoPair();

    if(twoPair) { return twoPair; }

    return myCurrentHand;
  }

  function oneOrTwoPair() {
    var hand = Pairs(grouped);

    if(hand.twoPair) {
      return _.omit(hand, 'twoPair');
    } else {
      return {
        hand:     'one pair',
        value:    hand.value,
        suit:     hand.suit,
        kicker:   kicker()
      }
    }
  }

  function kicker() {
    var singles = _.omit(grouped, (value, key) => { return value.length === 2; })
    var sortedValues = sortKeys(singles);

    return sortedValues[sortedValues.length - 1];
  }

  function sortKeys(filteredCards) {
    return (
      _.chain(filteredCards)
      .keys()
      .map(function(num) { return parseInt(num, 10); })
      .sort((a,b) => { return a - b; })
      .value()
    )
  }

  function isFourOrThreeOfAKindOrFullHouse() {
    var hand = {
      fourOfAKind:   FourOfAKind(grouped),
      threeOfAKind:  ThreeOfAKind(grouped)
    }

    if(hand.fourOfAKind.isHand) {
      return {
        hand:   'four of a kind',
        suit:   '',
        value:  hand.fourOfAKind.value
      };
    } else if(hand.threeOfAKind.isHand && (hand.threeOfAKind.bottomPair || hand.twoOfAKind)) {
      return {
        hand:         'full house',
        suit:         '',
        value:        hand.threeOfAKind.value,
        bottomPair:   hand.threeOfAKind.bottomPair || hand.twoOfAKind
      };
    } else if(hand.threeOfAKind.isHand) {
      return {
        hand:   'three of a kind',
        suit:   '',
        value:  hand.threeOfAKind.value
      };
    }

    return false;
  }

  function isFlushOrStraight() {
    var flush = Flush(cards);
    var straight = Straight(cards);

    if(straight.isHand && flush.isHand) {
      return {
        hand: 'straight flush',
        suit: flush.suit,
        value: straight.value
      };
    } else if(flush.isHand) {
      return {
        hand: 'flush',
        suit: flush.suit,
        value: flush.value
      };
    } else if(straight.isHand) {
      return {
        hand: 'straight',
        suit: '',
        value: straight.value
      };
    }

    return false;
  }

  return {
    myCurrentHighHand: evaluate()
  };
};


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


