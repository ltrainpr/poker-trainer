var Game = require("../game");

describe("Game", () => {
  it("Creates Players", () => {
    expect(Game.players.length).toBe(10)
  });

  it("Starts button at 4th index", () => {
    expect(Game.button).toBe(4)
  });
});