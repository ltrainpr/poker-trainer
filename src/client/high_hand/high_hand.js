const _ = require('underscore');
const Flush = require('./flush');
const Straight = require('./straight');
const FourOfAKind = require('./four_of_a_kind');
const ThreeOfAKind = require('./three_of_a_kind');
const twoPair = require('./two_pair');
const onePair = require('./one_pair');

function HighHand(cards) {
  const grouped = _.groupBy(cards, (obj) => obj.value );

  function isFlushOrStraight() {
    const flush = Flush(cards);
    const straight = Straight(cards);

    if(straight.isHand && flush.isHand) {
      return {
        hand: 'straight flush',
        suit: flush.hand.suit,
        value: straight.hand.value
      };
    }

    if(flush.isHand) { return flush.hand; }
    if(straight.isHand) { return straight.hand; }

    return false;
  }

  function fullHouse(threeOfAKind, singlePair) {
    return (
      threeOfAKind.isHand &&
      (threeOfAKind.bottomPair || singlePair.hand.value)
    )
  }

  function isFourOrThreeOfAKindOrFullHouse() {
    const fourOfAKind = FourOfAKind(grouped);
    if(fourOfAKind.isHand) { return fourOfAKind.hand; }

    const threeOfAKind = ThreeOfAKind(grouped);
    const singlePair = onePair(grouped);

    if(fullHouse(threeOfAKind, singlePair)) {
      return {
        hand:         'full house',
        value:        threeOfAKind.hand.value,
        bottomPair:   threeOfAKind.bottomPair || singlePair.hand.value
      };
    }

    if(threeOfAKind.isHand) { return threeOfAKind.hand; }

    return false;
  }

  function oneOrTwoPair() {
    const singlePair = onePair(grouped);
    const twoOrMorePairs = twoPair(grouped);
    if(twoOrMorePairs.isHand){ return twoOrMorePairs.hand; }
    if(singlePair.isHand) { return singlePair.hand; }

    return false;
  }

  function highCard() {
    let hand = cards.slice(0, 2);
    hand = _.pluck(hand, 'value').sort((a,b) => a - b);

    return {
      hand: 'high card',
      value: hand[1],
      kicker: hand[0]
    };
  }

  function evaluate() {
    let isHand;
    const func = [isFlushOrStraight, isFourOrThreeOfAKindOrFullHouse, oneOrTwoPair, highCard];
    for (let i = 0, len = func.length; i < len; i += 1) {
      isHand = func[i]()
      if(isHand) { return isHand };
    };

    return false;
  }

  return Object.assign({ suit: '' }, evaluate());
};


module.exports = HighHand;