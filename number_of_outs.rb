# PSEUDO CODE
=begin
1. Receive two arrays.  One with your hand, and the dealed hand.
2. Calculates highest current hand.
3. Prompts for estimated hand of opponent hand. (could be hand range in future).
4. Calculates opponent's highest current hand.
  High Hand Order:
  1. A, K, Q, J, 10-2
  2. Pair same order
  3. Two pairs
  4. Three of a kind
  5. Straight
  6. Flush
  7. Full House
  8. Four of a kind
  9. Straight Flush


5. Calculates the outs for each of the hands that would beat your opponents hand.


6. Returns hand that has hightest number of outs that would beat your opponent.


7. Returns log of full and partial outs.


8. Returns break even pot size (break even pot odds) for one bet, two bets, and three bets.
9. Returns the break even number of players need to raise on one bet, two bets, and three bets to you.


10. Returns check, bet, or raise guidance based on strength of hand, size of pot, and number of players.  Guidance on what Bet to protect your hand, Check raise to protect hand, Bet on draw, or Pot is big and just call, or Fold.


11. Returns implied odds on the turn (not flop).
=end

#puts ARGV
class ParseCards
  LOOKUP = { "J" => 11, "Q" => 12, "K" =>  13, "A" => 14 }
  attr_reader :my_hand_combined

  def initialize(cards)
    @cards = cards
    @my_hand = cards[0].split(" ") || []
    @community_cards = cards[1].split(" ") || []
    @my_hand_combined = @my_hand + @community_cards
  end

  def parse
    my_hand_combined.map do |card|
      str, suit = card.split("_")
      value = str.to_i > 0 ? str.to_i : LOOKUP[str]
      { value: value, suit: suit.downcase }
    end
  end
end

# parser = ParseCards.new(ARGV)
# p parser.parse

class HighHand
  attr_reader :cards
  attr_accessor :my_current_hand

  def initialize(cards)
    @cards = cards
    @my_current_hand = {}
  end

  def setFlush
    if flush?
      @my_current_hand[:hand] = 'flush'
      @my_current_hand[:suit] = @suit
      @my_current_hand[:value] = highestCardValue
    end

    @my_current_hand
  end

  def flush?
    @suit = cards[0].fetch(:suit)
    cards.all? do |card|
      card.fetch(:suit) == @suit
    end
  end

  def highestCardValue
    @cards.max_by { |hashmap| hashmap.fetch(:value) }.fetch(:value)
  end
end


=begin
Combine sets, parse all cards into array of hashmap 2-14 value and suit.

Is it a flush?
  - Iterate over hashmaps check if all suits are same.
  - If yes, then are the values sequential (is it a straight, see below).
  - Set flush variable to true/false.
  - If flush: true:
    - Set my_current_hand to hashmap to: hand: 'flush', value: <highest value>, suit: <suit>, suit: <suit>
Is it a straight?
  - Pluck all values.  Set card_values variable to plucked values and then sort.
  - Iterate over all values and check if they are sequential.
  - Check for wheel.  Are 2-5 and Ace are present.
  - Set straight variable to true/false.
  - If flush value is true.
    - Set my_current_hand hashmap to: hand: 'straight flush', value: <unchanged, same value as flush>, suit: <suit>
  - If straight value is true and flush is false then:
    - Set my_current_hand hashmap to: hand: 'straight', value: <higest value>, suit: <suit>

Is it 4 of kind?
  - Return false if flush or straight variables are true.
  - Pluck all suits.
  - Iterate over all values and check if 4 of 5 values are the same.
    - If true set my_current_hand hashmap to: hand: 'four of a kind', value: <value/number of 4 of a kind>, suit: <suit>
    - If 3 values are the same set my_current_hand  hash map to: hand: 'three of a kind', value: <value/number of 3 of a kind>, suit: <suit>
Is it a full house?
  - If my_current_hand hashmap has a hand of 'three of a kind' then check to see if the remaining 2 values match.
  - If true set my_current_hand hashmap to: hand: 'full house', value: <same value/number of 3 of a kind>, suit: <suit>
Is it 3 of a kind?
  - Return true if my_current_hand hashmap hand value is 'three of a kind'.
How many pairs?
  - Use group_by on array.  Iterate over hash map and append push the key into pairs array variable that have value array size of 2.  Append the other values to the kicker variable.
  - Sort pairs and kicker arrays.
  - If array length is 1. Then set my_current_hand to: hand: '1 pair', value: <pairs[-1]>, kicker: <kicker[-1]>, suit: <suit>
  - If array length is 2. Then set my_current_hand to: hand: '2 pair', value: <pairs[-1]>, bottom_pair: <pairs[-2]>, kicker: <kicker[-1]>, suit: <suit>
What's the high card?
=end


