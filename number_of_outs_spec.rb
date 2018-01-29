require 'test/unit'
require_relative 'number_of_outs'

class ParseCardsTest < Test::Unit::TestCase
  def setup
    @parameters = ["J_Spade J_Heart", "K_Club 7_Spade 8_Spade"]
    @parser = ParseCards.new(@parameters)
  end

  # def teardown
  # end

  def test_parse
    assert_equal(@parser.parse, [{:value=>11, :suit=>"spade"}, {:value=>11, :suit=>"heart"}, {:value=>13, :suit=>"club"}, {:value=>7, :suit=>"spade"}, {:value=>8, :suit=>"spade"}])
  end
end