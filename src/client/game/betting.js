var Betting = function() {
  const smallBlind = 1;
  const bigBlind = 2;
  var pot;

  function blinds(players, button) {
    var small = button + 1 === 10 ? players[0] : players[button];
    var big = players[bigBlindIndex(button)];

    small.money = small.money - smallBlind;
    big.money = big.money - bigBlind;

    return [small, big];
  }

  function bigBlindIndex(button) {
    var playerIndex = button + 2;

    switch (playerIndex) {
      case 10:
        return 0;
      case 11:
        return 1;
      default:
        return playerIndex;
    }
  }

  function playerBets(player, bet) {
    if (player.money > bet) {
      player.money = player.money - bet;
      pot = pot + bet;
    } else {
      console.log(
        "Betting#playerBets: Player is attempting to bet more than he has available."
      );
    }
  }

  function playerFolds(player) {
    player.hand.length = 0;
  }

  return { blinds, playerBets, playerFolds };
};

module.exports = Betting;
