var CardParser = require("../src/client/high_hand/card_parser");
var HighHand = require("../src/client/high_hand/high_hand");

describe("HighHand", () => {
  var parameters;
  describe("Flop", () => {
    it("flush", () => {
      parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'flush', value: 13, suit: 'heart' });
    });

    it("King high straight", () => {
      parameters = ["Q_Heart J_Club", "K_Heart 10_Spade 9_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 13, suit: '' });
    });

    it("10 high straight", () => {
      parameters = ["6_Heart 7_Club", "8_Heart 10_Spade 9_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 10, suit: '' });
    });

    it("the wheel straight", () => {
      parameters = ["2_Heart 4_Club", "3_Heart A_Spade 5_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 5, suit: '' });
    });

    it("straight flush", () => {
      parameters = ["Q_Club J_Club", "K_Club 10_Club 9_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 13, suit: 'club' });
    });

    it("the wheel straight flush", () => {
      parameters = ["2_Club 4_Club", "3_Club A_Club 5_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 5, suit: 'club' });
    });

    it("four of a kind", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart Q_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'four of a kind', value: 12, suit: '' });
    });

    it("full house", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart A_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'full house', value: 12, suit: '', bottomPair: 14 });
    });

    it("three of a kind", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart 5_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'three of a kind', value: 12, suit: '' });
    });

    it("two pair", () => {
      parameters = ["Q_Club Q_Spade", "5_Heart 5_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'two pair', value: 12, suit: '', bottomPair: 5, kicker: 14 });
    });

    it("one pair", () => {
      parameters = ["Q_Club J_Spade", "5_Heart 5_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'one pair', value: 5, suit: '', kicker: 14 });
    });

    it("no pairs high card", () => {
      parameters = ["2_Club 10_Spade", "J_Heart 5_Diamond 6_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'high card', value: 10, suit: '', kicker: 2 });
    });
  });

  describe("Turn", () => {
    it("flush", () => {
      parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart A_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'flush', value: 13, suit: 'heart' });
    });

    it("King high straight", () => {
      parameters = ["Q_Heart J_Club", "K_Heart 10_Spade 9_Diamond 3_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 13, suit: '' });
    });

    it("10 high straight", () => {
      parameters = ["6_Heart 7_Club", "8_Heart 10_Spade 9_Diamond K_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 10, suit: '' });
    });

    it("the wheel straight", () => {
      parameters = ["2_Heart 4_Club", "3_Heart A_Spade 5_Diamond J_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 5, suit: '' });
    });

    it("royal flush", () => {
      parameters = ["Q_Club J_Club", "K_Club 10_Club 9_Club A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 14, suit: 'club' });
    });

    it("the wheel straight flush", () => {
      parameters = ["2_Club 4_Club", "3_Club A_Club 5_Club A_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 5, suit: 'club' });
    });

    it("four of a kind", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart Q_Diamond A_Club 2_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'four of a kind', value: 12, suit: '' });
    });

    it("full house", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart A_Diamond A_Club A_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'full house', value: 14, suit: '', bottomPair: 12 });
    });

    it("three of a kind", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart 5_Diamond A_Club 9_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'three of a kind', value: 12, suit: '' });
    });

    it("two pair", () => {
      parameters = ["Q_Club Q_Spade", "5_Heart 5_Diamond A_Club 2_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'two pair', value: 12, suit: '', bottomPair: 5, kicker: 14 });
    });

    it("one pair", () => {
      parameters = ["Q_Club J_Spade", "5_Heart 5_Diamond A_Club 8_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'one pair', value: 5, suit: '', kicker: 14 });
    });

    it("no pairs high card", () => {
      parameters = ["2_Club 10_Spade", "J_Heart 5_Diamond 6_Club K_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'high card', value: 10, suit: '', kicker: 2 });
    });
  });

  describe("River", () => {
    it("flush", () => {
      parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart A_Spade 2_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'flush', value: 13, suit: 'heart' });
    });

    it("King high straight", () => {
      parameters = ["Q_Heart J_Club", "K_Heart 10_Spade 9_Diamond 3_Club J_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 13, suit: '' });
    });

    it("Jack high straight", () => {
      parameters = ["6_Heart 7_Club", "8_Heart 10_Spade 9_Diamond K_Heart J_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 11, suit: '' });
    });

    it("the wheel straight", () => {
      parameters = ["2_Heart 4_Club", "3_Heart A_Spade 5_Diamond J_Spade 6_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 6, suit: '' });
    });

    it("royal flush", () => {
      parameters = ["Q_Club J_Club", "K_Club 10_Club 9_Club A_Club 2_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 14, suit: 'club' });
    });

    it("the wheel straight flush", () => {
      parameters = ["2_Club 4_Club", "3_Club A_Club 5_Club A_Heart 7_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 5, suit: 'club' });
    });

    it("four of a kind", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart Q_Diamond A_Club 2_Diamond 6_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'four of a kind', value: 12, suit: '' });
    });

    it("full house", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart A_Diamond A_Club A_Spade 10_Spade"];
      expect(highHand(parameters)).toEqual({ hand: 'full house', value: 14, suit: '', bottomPair: 12 });
    });

    it("three of a kind", () => {
      parameters = ["Q_Club Q_Spade", "Q_Heart 5_Diamond A_Club 9_Diamond 4_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'three of a kind', value: 12, suit: '' });
    });

    it("two pair", () => {
      parameters = ["Q_Club Q_Spade", "5_Heart 5_Diamond A_Club 2_Club A_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'two pair', value: 14, suit: '', bottomPair: 12, kicker: 5 });
    });

    it("one pair", () => {
      parameters = ["Q_Club J_Spade", "5_Heart 5_Diamond A_Club 8_Heart 2_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'one pair', value: 5, suit: '', kicker: 14 });
    });

    it("no pairs high card", () => {
      parameters = ["2_Club 10_Spade", "J_Heart 5_Diamond 6_Club K_Heart 8_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'high card', value: 10, suit: '', kicker: 2 });
    });
  });
});

function highHand (params) {
  var parsedCards = CardParser(params).parse;
  return HighHand(parsedCards);
}