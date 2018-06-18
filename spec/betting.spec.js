var Betting = require("../src/client/game/betting");
var Game = require("../src/client/game/game");

describe("Betting", () => {
  var betting, game, players;

  beforeEach(() => {
    betting = Betting();
    game = Game();
    players = game.players
  });

  it("Gets blinds from players", () => {
    var small, big;
    var button = game.button.generateButtonIndex();
    [small, big] = game.betting.blinds(players, button)

    var smallBeforeBlind = small.money;
    var bigBeforeBlind = big.money;

    expect(small.money).toBe(199);
    expect(big.money).toBe(198);
  });

  it("#playerBets", () => {
    var player = game.players[0]
    game.betting.playerBets(player, 20);
    expect(player.money).toBe(180);
  });

  xit("#playerCalls", () => {
    var player = betting.playerBets(20);
    expect(player.money).toBe(180);
  });
});

function smallBlind(button) {
  if((button + 1) === 10) {
    return 0;
  } else {
    return button;
  }
}

function bigBlind(button) {
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
