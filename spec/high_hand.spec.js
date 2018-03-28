var CardParser = require("../card_parser");
var HighHand = require("../high_hand");

describe("HighHand", () => {
  describe("Flop", () => {

    // need to test for flush value being correct when there's a higher non flush card on the board.
    it("flush", () => {
      var parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'flush', value: 13, suit: 'heart' });
    });

    it("K high straight", () => {
      var parameters = ["Q_Heart J_Club", "K_Heart 10_Spade 9_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 13, suit: '' });
    });

    it("10 high straight", () => {
      var parameters = ["6_Heart 7_Club", "8_Heart 10_Spade 9_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 10, suit: '' });
    });

    it("the wheel straight", () => {
      var parameters = ["2_Heart 4_Club", "3_Heart A_Spade 5_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 5, suit: '' });
    });

    it("straight flush", () => {
      var parameters = ["Q_Club J_Club", "K_Club 10_Club 9_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 13, suit: 'club' });
    });

    it("the wheel straight flush", () => {
      var parameters = ["2_Club 4_Club", "3_Club A_Club 5_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 5, suit: 'club' });
    });

    it("four of a kind", () => {
      var parameters = ["Q_Club Q_Spade", "Q_Heart Q_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'four of a kind', value: 12, suit: '' });
    });

    it("full house", () => {
      var parameters = ["Q_Club Q_Spade", "Q_Heart A_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'full house', value: 12, suit: '', bottomPair: 14 });
    });

    it("three of a kind", () => {
      var parameters = ["Q_Club Q_Spade", "Q_Heart 5_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'three of a kind', value: 12, suit: '' });
    });

    it("two pair", () => {
      var parameters = ["Q_Club Q_Spade", "5_Heart 5_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'two pair', value: 12, suit: '', bottomPair: 5, kicker: 14 });
    });

    it("one pair", () => {
      var parameters = ["Q_Club J_Spade", "5_Heart 5_Diamond A_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'one pair', value: 5, suit: '', kicker: 14 });
    });
  });
});

function highHand (params) {
  var parsedCards = CardParser(params).parse;
  return HighHand(parsedCards).myCurrentHighHand;
}