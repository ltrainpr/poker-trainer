- Betting: Money tracking, distribution, and accounting.
  - Moves the button.
  - Initial/required bets.  The blinds 1/2 or 2/4.
  - Pot keeps track of money in the hand.
  - Betting actions (check, bet, call, raise) affect Player state.
    - Fold clears cards from player.
  - Keeps track of action.
  - While loop until all players have placed equal bets in the pot for that round.
    - Indicates when the betting round is over.  (Something tells dealer to deal next round of card/cards).



Thoughts
- There needs to be a process/managing function that initiates/holds the state of the players and the pot.
- This managing function will call on Dealer and Betting functions that will return copies of the altered player and pot state.
- Managing function will update state of players.

