var Dealer = require("../src/client/game/dealer");
var Game = require("../src/client/game/game");
var _ = require('underscore');

describe("Dealer", () => {
  var players;

  beforeEach(() => {
    players = Game().players
  });

  it("Deals two cards to every player", () => {
    var dealer = Dealer();
    dealer.deal(players);
    expect(players[_.random(9)].hand.length).toBe(2);
  });

  it("Every card dealt gets popped off the array", () => {
    var dealer = Dealer();
    expect(dealer.currentDeck().length).toBe(52);
    dealer.deal(players);
    expect(dealer.currentDeck().length).toBe(32);
  });

  it("#dealFlop", () => {
    var dealer = Dealer();
    dealer.deal(players);
    dealer.dealFlop();
    expect(dealer.currentDeck().length).toBe(29);
    expect(dealer.communityCards().length).toBe(3);
  });

  it("deal the turn", () => {
    var dealer = Dealer();
    dealer.deal(players);
    dealer.dealFlop();
    dealer.dealNext();
    expect(dealer.currentDeck().length).toBe(28);
    expect(dealer.communityCards().length).toBe(4);
  });

  it("deal the river", () => {
    var dealer = Dealer();
    dealer.deal(players);
    dealer.dealFlop();
    dealer.dealNext();
    dealer.dealNext();
    expect(dealer.currentDeck().length).toBe(27);
    expect(dealer.communityCards().length).toBe(5);
  });

  it("#nextHand", () => {
    var dealer = Dealer();
    dealer.deal(players);
    dealer.dealFlop();
    dealer.dealNext();
    dealer.dealNext();
    dealer.nextHand(players);

    expect(dealer.currentDeck().length).toBe(52);
    expect(dealer.communityCards().length).toBe(0);
  });
});