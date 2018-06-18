var ShuffledDeck = require("../src/client/game/shuffler");

describe("ShuffledDeck", () => {
  it("has 52 cards", () => {
    expect(ShuffledDeck().length).toBe(52);
  });
});