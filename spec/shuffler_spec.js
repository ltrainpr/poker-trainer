var ShuffledDeck = require("../shuffler");

describe("ShuffledDeck", () => {
  it("has 52 cards", () => {
    expect(ShuffledDeck().length).toBe(52);
  });
});