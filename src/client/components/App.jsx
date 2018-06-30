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
    this.dealer.deal(this.players);
    this.isBettingRoundOver = this.isBettingRoundOver.bind(this);
    this.state = {
      round: 'preFlop',
    }
  }

  isBettingRoundOver(highestBet) {
    const betsMatch = _.all(this.players, (player) =>
      (player.bet && player.bet === highestBet)
    )

    if(betsMatch) {
      this.setState({
        round: this.nextRound()
      })
    }
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
        this.dealer.nextHand();
        return "preFlop";
    }
  }

  render() {
    const { round } = this.state;

    return (
      <div>
        <div>
          <BettingContainer
            players={this.game.players}
            button={this.game.button}
            isBettingRoundOver={this.isBettingRoundOver} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) =>
              <CommunityCards card={card} round={ round } />
            )
          }
        </div>
      </div>
    );
  }
}

export default PokerGame;