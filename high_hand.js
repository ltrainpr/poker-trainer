var _ = require('underscore');
var Flush = require('./flush');
var Straight = require('./straight');
var FourOfAKind = require('./four_of_a_kind');
var ThreeOfAKind = require('./three_of_a_kind');
var twoPair = require('./two_pair');
var onePair = require('./one_pair');

var HighHand = function (cards) {
  var pair;
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
    var twoOrMorePairs = twoPair(grouped);
    if(twoOrMorePairs.isHand){
      return _.omit(twoOrMorePairs, 'isHand');
    }

    if(pair.isHand) {
      return _.omit(pair, 'isHand');
    }
  }

  function isFourOrThreeOfAKindOrFullHouse() {
    var fourOfAKind = FourOfAKind(grouped);
    if(fourOfAKind.isHand) {
      return {
        hand:   'four of a kind',
        suit:   '',
        value:  fourOfAKind.value
      };
    }

    var threeOfAKind = ThreeOfAKind(grouped);
    pair = onePair(grouped);

    if(threeOfAKind.isHand && (threeOfAKind.bottomPair || pair.value)) {
      return {
        hand:         'full house',
        suit:         '',
        value:        threeOfAKind.value,
        bottomPair:   threeOfAKind.bottomPair || pair.value
      };
    }

    if(threeOfAKind.isHand) {
      return {
        hand:   'three of a kind',
        suit:   '',
        value:  threeOfAKind.value
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