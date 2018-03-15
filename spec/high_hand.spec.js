var CardParser = require("../card_parser");
var HighHand = require("../high_hand");

describe("HighHand", () => {
  describe("Flop", () => {
    it("flush", () => {
      var parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart"];
      expect(highHand(parameters)).toEqual({ hand: 'flush', value: 13, suit: 'heart' });
    });

    it("straight", () => {
      var parameters = ["Q_Heart J_Club", "K_Heart 10_Spade 9_Diamond"];
      expect(highHand(parameters)).toEqual({ hand: 'straight', value: 13, suit: '' });
    });

    xit("straight flush", () => {
      var parameters = ["Q_Club J_Club", "K_Club 10_Club 9_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'straight flush', value: 13, suit: 'club' });
    });

    xit("four of a kind", () => {
      var parameters = ["Q_Club Q_Spade", "Q_Heart Q_Diamond 9_Club"];
      expect(highHand(parameters)).toEqual({ hand: 'four of a kind', value: 12, suit: '' });
    });
  });
});

function highHand (params) {
  var parsedCards = CardParser(params).parse;
  return HighHand(parsedCards).myCurrentHighHand;
}