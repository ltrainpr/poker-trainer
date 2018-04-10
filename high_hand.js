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
    return _.omit(Pairs(grouped), 'twoPair');
  }

  function isFourOrThreeOfAKindOrFullHouse() {
    var hand = {
      fourOfAKind:    FourOfAKind(grouped),
      threeOfAKind:   ThreeOfAKind(grouped),
      twoOfAKind:     Pairs(grouped)
    };

    if(hand.fourOfAKind.isHand) {
      return {
        hand:   'four of a kind',
        suit:   '',
        value:  hand.fourOfAKind.value
      };
    } else if(hand.threeOfAKind.isHand && (hand.threeOfAKind.bottomPair || hand.twoOfAKind.value)) {
      return {
        hand:         'full house',
        suit:         '',
        value:        hand.threeOfAKind.value,
        bottomPair:   hand.threeOfAKind.bottomPair || hand.twoOfAKind.value
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