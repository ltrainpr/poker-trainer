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

    this.state = {
      round: 'preFlop',
      highestBet: this.betting.highestBet(this.players)
    }
  }

  isBettingRoundOver() {
    const highestBet = this.betting.highestBet(this.players)
    const betsMatch = _.all(this.playersInHand(), (player) =>
      (player.bet && player.bet === highestBet)
    )

    if(betsMatch) {
      this.setState({
        round: this.nextRound(),
        highestBet
      })
    }

    this.setState({highestBet})
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
            highestBet={highestBet} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) => {
              const key = `${card.value} ${card.suit}`
              return (<CommunityCards key={key} card={card} id={key} />)
            }
            )
          }
        </div>
      </div>
    );
  }
}

export default PokerGame;