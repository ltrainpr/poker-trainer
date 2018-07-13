const _ = require('underscore');

function Betting() {
  const smallBlind = 1;
  const bigBlind = 2;

  function bigBlindIndex(button) {
    const playerIndex = button + 2;

    switch (playerIndex) {
      case 10:
        return 0;
      case 11:
        return 1;
      default:
        return playerIndex;
    }
  }

  function blinds(players, button) {
    const small = button + 1 === 10 ? players[0] : players[button];
    const big = players[bigBlindIndex(button)];

    small.money -= smallBlind;
    big.money -= bigBlind;

    return [small, big];
  }

  function playerBets(player, bet) {
    const currentPlayer = player;
    if (currentPlayer.money > bet) {
      currentPlayer.money -= bet;
      currentPlayer.bet = bet;
    }

    return currentPlayer;
  }

  function playerFolds(player) {
    const currentPlayer = player;
    currentPlayer.hand.length = 0;
    currentPlayer.bet = 0;
  }

  function highestBet(players) {
    const maxBet = _.max(players, (player) =>  player.bet );
    return _.isEmpty(maxBet) ? 0 : maxBet.bet;
  }

  function betsMatch(players) {
    const maxBet = this.highestBet(players);
    return _.all(players, (player) =>
      (player.bet && player.bet === maxBet))
  }

  function playersInHand(players) {
    return players.filter(player => (player.hand.length === 2));
  }

  function clearPlayerBets(players) {
    players.forEach(pokerPlayer => {
      const player = pokerPlayer;
      player.bet = null;
      return player;
    })
  }

  return { blinds, playerBets, playerFolds, highestBet, betsMatch, playersInHand, clearPlayerBets };
};

module.exports = Betting;
