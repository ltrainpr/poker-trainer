var Betting = require("../betting");

describe("Betting", () => {
  it("Gets blinds from players", () => {
    expect(Betting.players.length).toBe(10);
  });
});