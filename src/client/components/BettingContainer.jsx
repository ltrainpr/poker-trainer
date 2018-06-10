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
      hand: this.props.player.hand
    };
  }

  nextPlayerHand(hand) {
    this.setState({
      hand: hand
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
        <div>
          <BetAmount updateFilter={this.bettingAmount} />
        </div>
        <div>
          <ActionButton
            action="Call"
            value="call"
            player={this.props.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
          <ActionButton
            action="Bet"
            value="bet"
            player={this.props.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
          <ActionButton
            action="Raise"
            value="raise"
            player={this.props.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            game={this.props.game}
          />
          <ActionButton
            action="Fold"
            value="fold"
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
