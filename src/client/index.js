import React from "react";
import { render } from "react-dom";
import BettingContainer from "./components/BettingContainer.jsx";
import CommunityCards from "./components/CommunityCards.jsx";
import styles from "./scss/application.scss";
var _ = require('underscore');
var Game = require("./game/game");

class PokerGame extends React.Component {
  constructor() {
    super();
    this.game = this.game || Game();
    this.players = this.game.players
    this.dealer = this.game.dealer
    var actions = ["Call", "Bet", "Raise", "Fold"];
    this.dealer.deal(this.players);
    this.isBettingRoundOver = this.isBettingRoundOver.bind(this);
    this.state = {
      round: 'preFlop',
    }
  }

  isBettingRoundOver(highestBet) {
    var betsMatch = _.all(this.players, (player) => {
      return (player.bet && player.bet === highestBet)
    })

    if(betsMatch) {
      this.setState({
        round: this.nextRound()
      })
    }
  }

  nextRound() {
    switch(this.state.round) {
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
    return (
      <div>
        <div>
          <BettingContainer
            players={this.game.players}
            button={this.game.button}
            actions={actions}
            isBettingRoundOver={this.isBettingRoundOver} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) => {
              return (
                <CommunityCards key={card} card={card} round={this.state.round} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

render(<PokerGame />, document.getElementById("root"));
