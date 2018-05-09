var Dealer = require("./dealer");

var Betting = function() {
  const smallBlind = 1;
  const bigBlind = 2;
  var dealer = dealer || Dealer();
  var players = dealer.players;
  var pot = 0;

  function blinds() {
    var button = dealer.getButtonPosition();
    var small = button + 1 === 10 ? 0 : button;
    var big = bigBlindIndex(button);

    players[small].money = players[small].money - smallBlind;
    players[big].money = players[big].money - bigBlind;

    return [players[small], players[big]];
  }

  function bigBlindIndex(button) {
    var sum = button + 2;

    switch (sum) {
      case 10:
        return 0;
      case 11:
        return 1;
      default:
        return sum;
    }
  }

  function playerBets(bet) {
    var player = dealer.action;
    if(player.money > bet) {
      player.money = player.money - bet;
      pot = pot + bet;
    } else {
      console.log("Betting#playerBets: Player is attempting to bet more than he has available.");
    }

    return player;
  }

  return {
    blinds: blinds,
    playerBets: playerBets
  }
};

module.exports = Betting;