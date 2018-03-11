var CardParser = require("../high_hand");
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

/*describe HighHand do
  before do
    parameters = ["Q_Heart J_Heart", "K_Heart 7_Heart 8_Heart"]
    cards = ParseCards.new(parameters).parse
    @high_hand = HighHand.new(cards)
  end
  it "#highestCardValue" do
    assert_equal 13, @high_hand.highestCardValue
  end

  it "#flush?" do
    assert_equal true, @high_hand.flush?
  end

  it "#setFlush" do
    assert_equal({ hand: 'flush', value: 13, suit: 'heart' }, @high_hand.setFlush)
  end
end*/