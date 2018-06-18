var Player = require("../src/client/game/player");

describe("Player", () => {
  it("has name, hand, type, and money properties", () => {
    expect(Object.getOwnPropertyNames(Player())).toEqual(["name", "hand", "type", "money"]);
  });

  it("has name passed in", () => {
    var player1 = Player("playerOne");
    var player2 = Player("playerTwo");
    expect(player1.name).toBe("playerOne");
    expect(player2.name).toBe("playerTwo");
  });
});