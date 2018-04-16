var _ = require('underscore');
var Flush = require('./flush');
var Straight = require('./straight');
var FourOfAKind = require('./four_of_a_kind');
var ThreeOfAKind = require('./three_of_a_kind');
var twoPair = require('./two_pair');
var onePair = require('./one_pair');

var HighHand = function (cards) {
  var singlePair;
  var grouped = _.groupBy(cards, (obj) => { return obj.value; });

  function evaluate() {
    var isHand;
    var func = [isFlushOrStraight, isFourOrThreeOfAKindOrFullHouse, oneOrTwoPair, highCard];
    for (var i = 0, len = func.length; i < len; i++) {
      isHand = func[i]()
      if(isHand) { return isHand };
    };
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
    }

    if(flush.isHand) {
      return {
        hand: 'flush',
        suit: flush.suit,
        value: flush.value
      };
    }

    if(straight.isHand) {
      return {
        hand: 'straight',
        value: straight.value
      };
    }

    return false;
  }

  function isFourOrThreeOfAKindOrFullHouse() {
    var fourOfAKind = FourOfAKind(grouped);
    if(fourOfAKind.isHand) {
      return {
        hand:   'four of a kind',
        value:  fourOfAKind.value
      };
    }

    var threeOfAKind = ThreeOfAKind(grouped);
    singlePair = onePair(grouped);

    if(fullHouse(threeOfAKind, singlePair)) {
      return {
        hand:         'full house',
        value:        threeOfAKind.value,
        bottomPair:   threeOfAKind.bottomPair || singlePair.value
      };
    }

    if(threeOfAKind.isHand) {
      return {
        hand:   'three of a kind',
        value:  threeOfAKind.value
      };
    }

    return false;
  }

  function fullHouse(threeOfAKind, singlePair) {
    return (
      threeOfAKind.isHand &&
      (threeOfAKind.bottomPair || singlePair.value)
    )
  }

  function oneOrTwoPair() {
    var twoOrMorePairs = twoPair(grouped);
    if(twoOrMorePairs.isHand){
      return _.omit(twoOrMorePairs, 'isHand');
    }

    if(singlePair.isHand) {
      return _.omit(singlePair, 'isHand');
    }
  }

  function highCard() {
    var hand = cards.slice(0, 2);
    hand = _.pluck(hand, 'value').sort((a,b) => { return a - b; });

    return {
      hand: 'high card',
      value: hand[1],
      kicker: hand[0]
    };
  }

  return Object.assign({ suit: '' }, evaluate());
};


module.exports = HighHand;