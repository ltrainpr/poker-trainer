var Shuffler = require("../shuffler");

describe("Shuffler", () => {
  it("has 52 cards", () => {
    expect(Shuffler.shuffle.count).toBe(52);
  });
});