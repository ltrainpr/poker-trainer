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

  it("Action should be on 3rd player after button", () => {
    var dealer = Dealer();
    var underTheGun = dealer.button() + 3;
    if(underTheGun > 9) { underTheGun = underTheGun.toString(10).split("")[1]; }
    expect(dealer.action).toEqual(Game.players[underTheGun]);
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
    var button = dealer.button();
    dealer.deal();
    dealer.dealFlop();
    dealer.dealNext();
    dealer.dealNext();
    dealer.nextHand();

    expect(dealer.currentDeck().length).toBe(52);
    expect(dealer.communityCards().length).toBe(0);

    var nextButton = button === 9 ? 0 : button + 1;
    expect(dealer.button()).toBe(nextButton);
  });
});