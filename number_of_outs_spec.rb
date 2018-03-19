require "minitest/autorun"
require_relative 'number_of_outs'

describe ParseCards do
  before do
    parameters = ["J_Spade J_Heart", "K_Club 7_Spade 8_Spade"]
    @parser = ParseCards.new(parameters)
  end

  it "parses the cards into array of objects" do
    assert_equal(@parser.parse, [{:value=>11, :suit=>"spade"}, {:value=>11, :suit=>"heart"}, {:value=>13, :suit=>"club"}, {:value=>7, :suit=>"spade"}, {:value=>8, :suit=>"spade"}])
  end
end

describe HighHand do
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
end