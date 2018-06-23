- Display how much is in the pot.
  - Keep track of pot.
- Display largest bet amount and how you much you need to put in
  - Need to return bet from 'Betting#playerBets'
  - Need players bet state tracking so we know when everybody has put in the required amount.
    - On action from player need callback to check if betting round is over: Iterate over all players.
    - Needs to skip players that fold (bet is "").  Or only pass in players currently in hand to children/inner views.
  - When round is over add bets to the pot, clear that intermediate player bet state, and deal flop community cards.


- Need to display player money state.
- BettingRound: every time player bets

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

