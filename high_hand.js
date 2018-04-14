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
    var fourOrThreeOfAKindOrFullHouse, twoPair, pairedHand;
    var flushOrStraight = isFlushOrStraight();

    if(flushOrStraight) { return flushOrStraight; }

    fourOrThreeOfAKindOrFullHouse = isFourOrThreeOfAKindOrFullHouse();
    if(fourOrThreeOfAKindOrFullHouse) { return fourOrThreeOfAKindOrFullHouse; }

    pairedHand = oneOrTwoPair();
    if(pairedHand) { return pairedHand; }

    return highCard();
  }

  function highCard() {
    var hand = cards.slice(0, 2);
    hand = _.pluck(hand, 'value').sort((a,b) => { return a - b; });

    return {
      hand: 'high card',
      value: hand[1],
      suit: '',
      kicker: hand[0]
    };
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
    singlePair = onePair(grouped);

    if(threeOfAKind.isHand && (threeOfAKind.bottomPair || singlePair.value)) {
      return {
        hand:         'full house',
        suit:         '',
        value:        threeOfAKind.value,
        bottomPair:   threeOfAKind.bottomPair || singlePair.value
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