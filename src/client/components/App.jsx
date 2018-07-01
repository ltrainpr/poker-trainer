import React from "react";
import BettingContainer from "./BettingContainer";
import CommunityCards from "./CommunityCards";

const _ = require('underscore');
const Game = require("../game/game");

class PokerGame extends React.Component {
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
    this.betsMatch = this.betsMatch.bind(this);

    this.state = {
      round: 'preFlop',
      highestBet: this.betting.highestBet(this.players)
    }
  }

  betsMatch() {
    const highestBet = this.betting.highestBet(this.players)
    this.setState({highestBet})
    return _.all(this.playersInHand(), (player) =>
      (player.bet && player.bet === highestBet))
  }

  isHandOver(bettingRoundComplete) {
    const { round } = this.state;

    if (this.playersInHand().length === 1) {
      this.dealer.nextHand(this.players)
      return true;
    }

    if (round === 'river' && bettingRoundComplete) {
      this.dealer.nextHand(this.players)
      return true
    }

    return false;
  }

  isBettingRoundOver() {
    const bettingRoundComplete = this.betsMatch();
    this.isHandOver(bettingRoundComplete);

    if(bettingRoundComplete) {
      this.setState({
        round: this.nextRound()
      })
    }
  }

  playersInHand() {
    return this.players.filter(player => (player.hand.length === 2))
  }

  nextRound() {
    const { round } = this.state

    switch(round) {
      case "preFlop":
        this.dealer.dealFlop();
        return "flop";
      case "flop":
        this.dealer.dealNext();
        return "turn";
      case "turn":
        this.dealer.dealNext();
        return "river";
      default:
        this.dealer.nextHand(this.players);
        return "preFlop";
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
            highestBet={highestBet}
            isHandOver={this.isHandOver} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) => {
              const key = `${card.value} ${card.suit}`
              return (<CommunityCards key={key} card={card} id={key} />)
            })
          }
        </div>
      </div>
    );
  }
}

export default PokerGame;