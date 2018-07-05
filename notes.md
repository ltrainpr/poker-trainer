- Show hand is getting undefined/player when a single player is left after any given betting round.
- Flop, Turn, River rounds should start with player closest to under the gun player after bets are square/in.

- Analyze/Evaluate hands in each round for each player.

- Add a deal next hand button:
  - Deals next hand.


TODO:
- All in split pots.
- Add in check button/action.  Moves to next player without betting, assuming no other player has bet.
- If all players fold it should ante money to big blind.

Data: Players

- Game
  - PlayerCards
  - PlayerName
  - BettingAmount
  - BettingActions

Texas Holdem Game:
- 10 different 2 card hands and community cards.
  - Shuffler shuffles hands.
  - Dealer distributes hands.
  - Game keeps track of community cards hands.
  - Player keeps track of players hands.

- Betting: Money tracking, distribution, and accounting.
  - Initial/required bets.  The blinds 1/2 or 2/4.
  - Pot keeps track of money in the hand.
  - Betting actions (check, bet, call, raise) affect Player state.

- Type of opponent (How the person plays)
  - Does he play a lot of hands or only a few?
  - Does he play aggressively or passively?
  - Start with 2 tight passive, 1 loose aggressive players, 2 Loose passive, 4 Tight aggressive
  - Tight passive
  - Tight aggressive
  - Loose passive
  - Loose aggressive

- Statistics of hand.
  - Number of players
  - Number of Outs
  - Pot odds
  - Implied odds
  - Percent chance of making your draws.  Asks what draw to calculate?
  -
- Decision tree of appropriate action (check, call, raise, fold), and how much?
  - Should you fold.  What makes it a bad call/raise?  What would make it a good raise?
  - Should you call.  What makes it a bad call?  What would make it a good call?
  - At which point is it a toss up (break even)?
  - How do you know how much to bet/raise?  Amount that you need to bet in order to make a bad call.

