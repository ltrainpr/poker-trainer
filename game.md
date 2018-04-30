- 10 different 2 card hands and community cards.
  - Shuffler shuffles hands.
  - Dealer distributes hands.
  - Game keeps track of community cards.

Shuffler:
- 52 card array.  Maybe array of objects which includes values.
- Shuffle array objects three times before dealing.

Dealer:
- Make copy of array.
- Deal two cards to every player from left to right starting with first left seat for now.
- Every card dealt gets shifted off the array.

Game:
- Keeps track of community cards.
- Keeps track of the blinds.
- Keeps track of the button.
- Keeps track of money in the pot.
- Keeps track of the rake. 10% up to $4 max.  Only start collecting after flop.  Fill to 10% on each stage of hand.

Player:
- Holds state of current hand (player's 2 cards in the hole).
- Holds player total money.  How much does each player start with?
- Holds current type of player.
