- Pot needs to reset when hand is over.
- Check button/action moves to next player without betting, assuming no other player has bet.
- Betting less than currrent highValue should not be allowed
- Add a deal next hand button:
  - Deals next hand.
- Display players remaining money amount.

TODO:
- If all players fold it should give ante money to big blind.
- Analyze/Evaluate hands in each round for each player.
  - Hand odds of winning.
  - How many outs?
  -
- All in split pots.

REFACTOR (Make as many dumb components as you can):
  - Move state to App.jsx level.
    - Player
    - Highest Bet
  - Which functions can be extracted into js pure functional file.


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

