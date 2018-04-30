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

Player:
- Holds state of current hand (player's 2 cards in the hole).
- Holds player total money.  How much does each player start with?
- Holds current type of player.

Game:
- Keeps track of cards for each player
