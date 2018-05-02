var Dealer = require("../dealer");
var Game = require("../game");
var _ = require('underscore');

describe("Dealer", () => {
  it("Deals two cards to every player", () => {
    Dealer().deal();
    expect(Game.players[_.random(9)].hand.length).toBe(2);
  });

  it("Every card dealt gets shifted off the array", () => {
    var dealer = Dealer();
    expect(dealer.currentDeck.length).toBe(52);
    dealer.deal();
    expect(dealer.currentDeck.length).toBe(32);
  });
});