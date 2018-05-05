var Dealer = require("../dealer");
var Game = require("../game");
var _ = require('underscore');

describe("Dealer", () => {
  it("Deals two cards to every player", () => {
    Dealer().deal();
    expect(Game.players[_.random(9)].hand.length).toBe(2);
  });

  it("Every card dealt gets popped off the array", () => {
    var dealer = Dealer();
    expect(dealer.currentDeck().length).toBe(52);
    dealer.deal();
    expect(dealer.currentDeck().length).toBe(32);
  });

  it("Starting action should be on 3rd player after button", () => {
    var blind = Game.button;
    var dealer = Dealer();
    expect(dealer.action).toEqual(Game.players[7]);
  });

  it("#dealFlop", () => {
    var dealer = Dealer();
    dealer.deal();
    dealer.dealFlop();
    expect(dealer.currentDeck().length).toBe(29);
    expect(dealer.communityCards().length).toBe(3);
  });

  it("deal the turn", () => {
    var dealer = Dealer();
    dealer.deal();
    dealer.dealFlop();
    dealer.dealNext();
    expect(dealer.currentDeck().length).toBe(28);
    expect(dealer.communityCards().length).toBe(4);
  });

  it("deal the river", () => {
    var dealer = Dealer();
    dealer.deal();
    dealer.dealFlop();
    dealer.dealNext();
    dealer.dealNext();
    expect(dealer.currentDeck().length).toBe(27);
    expect(dealer.communityCards().length).toBe(5);
  });

  it("#nextHand", () => {
    var dealer = Dealer();
    dealer.deal();
    dealer.dealFlop();
    dealer.dealNext();
    dealer.dealNext();
    dealer.nextHand();
    expect(dealer.currentDeck().length).toBe(52);
    expect(dealer.communityCards().length).toBe(0);
    expect(dealer.button()).toBe(5);
  });
});