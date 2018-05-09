var Game = require("../game");

describe("Game", () => {
  it("Creates Players", () => {
    expect(Game().players.length).toBe(10);
  });
});