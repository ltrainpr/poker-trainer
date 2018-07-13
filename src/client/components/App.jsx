import React from "react";
import BettingContainer from "./BettingContainer";
import CommunityCards from "./CommunityCards";
import HighestHand from "./HighestHand"

const _ = require('underscore');
const Game = require("../game/game");
const HighHand = require("../high_hand/high_hand")

class App extends React.Component {
  constructor() {
    super();
    this.game = this.game || Game();
    this.players = this.game.players
    this.dealer = this.game.dealer
    this.betting = this.game.betting
    this.dealer.deal(this.players);

    this.isBettingRoundOver = this.isBettingRoundOver.bind(this);
    this.playersInHand = this.playersInHand.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.isHandOver = this.isHandOver.bind(this);
    this.evaluateHands = this.evaluateHands.bind(this);
    this.clearPlayerBets = this.clearPlayerBets.bind(this);

    this.state = {
      round: App.preFlop,
      highestBet: 0,
      evaluatedHands: []
    }
  }

  static get preFlop() { return 'preFlop'; }

  static get flop() { return 'flop'; }

  static get turn() { return 'turn'; }

  static get river() { return 'river'; }

  evaluateHands() {
    const players = this.playersInHand()
    const communityCards = this.dealer.communityCards()

     return players.map(player => {
      const cards = player.hand.concat(communityCards);
      return {highHand: HighHand(cards), cards: player.hand};
    })
  }

  newHand() {
    this.dealer.nextHand(this.players);
    // need to reset pot.
    this.dealer.deal(this.players);
  }

  isHandOver(bettingRoundComplete) {
    const { round } = this.state;

    return (
      this.playersInHand().length === 1 ||
        (round === App.river && bettingRoundComplete)
    );
  }

  clearPlayerBets() {
    this.betting.clearPlayerBets(this.playersInHand());
  }

  isBettingRoundOver() {
    const bettingRoundComplete = this.betting.betsMatch(this.playersInHand());
    const handIsOver = this.isHandOver(bettingRoundComplete);

    if (bettingRoundComplete) {
      this.clearPlayerBets();
      this.setState({
        highestBet: 0,
        round: this.nextRound()
      })
    } else {
      this.setState({
        highestBet: this.betting.highestBet(this.players)
      })
    }

    if (handIsOver) {
      this.setState({
        evaluatedHands: this.evaluateHands(),
        round: App.preFlop
      })
    }
  }

  playersInHand() {
    return this.betting.playersInHand(this.players);
  }

  nextRound() {
    const { round } = this.state;

    switch(round) {
      case App.preFlop:
        this.dealer.dealFlop();
        return App.flop;
      case App.flop:
        this.dealer.dealNext();
        return App.turn;
      case App.turn:
        this.dealer.dealNext();
        return App.river;
      default:
        return App.preFlop;
    }
  }

  render() {
    const { highestBet } = this.state;

    return (
      <div>
        <div>
          <BettingContainer
            players={this.game.players}
            button={this.game.button}
            isBettingRoundOver={this.isBettingRoundOver}
            highestBet={highestBet} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) => {
              const key = `${card.value} ${card.suit}`
              return (<CommunityCards key={key} card={card} id={key} />)
            })
          }
        </div>
        <div>
          {
            this.state.evaluatedHands.map((obj, idx) => {
              return <HighestHand key={idx} result={obj.highHand} cards={obj.cards} />
            })
          }
        </div>
      </div>
    );
  }
}

export default App;