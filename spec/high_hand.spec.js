var CardParser = require("../card_parser");
var HighHand = require("../high_hand");

describe("HighHand", () => {
  beforeEach(() => {
    parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart"];
    cards = CardParser(parameters).parse;
    high_hand = HighHand(cards);
  });

  it("#isFlush", () => {
    expect(high_hand.isFlush).toEqual(true)
  });

  it("#highestCardValue", () => {
    expect(high_hand.highestCardValue).toEqual(13)
  });

  it("#setFlush", () => {
    expect(high_hand.setFlush).toEqual({ hand: 'flush', value: 13, suit: 'heart' })
  });

})