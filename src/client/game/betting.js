var Betting = function() {
  const smallBlind = 1;
  const bigBlind = 2;
  var actionIndex;

  function playerToAct(players, underTheGun){
    return players[getPlayerToActIndex(underTheGun)]
  }

  function getPlayerToActIndex(underTheGun) {
    actionIndex = actionIndex || underTheGun;

    switch (actionIndex) {
      case 10:
        actionIndex = 0;
      case 11:
        actionIndex = 1;
      case 12:
        actionIndex = 2;
      default:
        actionIndex = actionIndex;
    }

    return actionIndex
  }

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
    if(player.money > bet) {
      player.money = player.money - bet;
      pot = pot + bet;
      actionIndex += 1;
    } else {
      console.log("Betting#playerBets: Player is attempting to bet more than he has available.");
    }

    return player;
  }

  function playerFolds(player) {
    player.hand.length = 0;
    actionIndex += 1;
  }

  return { playerToAct, blinds, playerBets, playerFolds };
};

module.exports = Betting;