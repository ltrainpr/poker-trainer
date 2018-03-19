var CardParser = require("../card_parser");
var _ = require('underscore');

describe("CardParser", () => {
  var cards, parameters;

  beforeEach(() => {
    parameters = ["J_Spade J_Heart", "K_Club 7_Spade 8_Spade"];
    cards = CardParser(parameters).parse;
  });

  it("parses the cards into array of objects", () => {
    expect(_.pluck(cards, 'value')).toEqual([11, 11, 13, 7, 8]);
    expect(_.pluck(cards, 'suit')).toEqual(["spade", "heart", "club", "spade", "spade"]);
  });
});