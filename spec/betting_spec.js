var Betting = require("../betting");

describe("Betting", () => {
  var betting, dealer;

  beforeEach(() => {
    betting = Betting();
  });

  it("Gets blinds from players", () => {
    var small, big;
    [small, big] = betting.blinds()

    var smallBeforeBlind = small.money;
    var bigBeforeBlind = big.money;

    expect(small.money).toBe(199);
    expect(big.money).toBe(198);
  });

  it("#playerBets", () => {
    var player = betting.playerBets(20);
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
