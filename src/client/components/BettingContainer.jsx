import React, { Component } from "react";
import ShowHand from "./ShowHand.jsx";
import BetAmount from "./BetAmount.jsx";
import ActionButton from "./ActionButton.jsx";

class BettingContainer extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.bettingAmount = this.bettingAmount.bind(this);
    this.nextPlayerHand = this.nextPlayerHand.bind(this);
    this.state = {
      bet: "",
      player: this.props.player,
      hand: this.props.player.hand
    };
  }

  nextPlayerHand(player) {
    this.setState({
      player: player,
      hand: player.hand,
      bet: ""
    });
  }

  bettingAmount(bet) {
    this.setState({
      bet: bet
    });
  }

  render() {
    return (
      <div>
        <div>
          <ShowHand hand={this.state.hand} />
        </div>
        <div>{this.state.player.name}</div>
        <div>
          <BetAmount updateFilter={this.bettingAmount} />
        </div>
        <div>
          <ActionButton
            value="Call"
            player={this.state.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
          <ActionButton
            value="Bet"
            player={this.props.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
          <ActionButton
            value="Raise"
            player={this.props.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
          <ActionButton
            value="Fold"
            player={this.props.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
        </div>
      </div>
    );
  }
}

export default BettingContainer;
