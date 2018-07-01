import React, { Component } from "react";
import Betting from "../game/betting";

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.betting = Betting();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { player, bet, nextPlayerHand, value, highestBet } = this.props;
    switch (value.toLowerCase()) {
      case "fold":
        this.betting.playerFolds(player);
        nextPlayerHand();
        break;
      case "call":
        this.betting.playerBets(player, highestBet);
        nextPlayerHand();
        break;
      case "bet":
        this.betting.playerBets(player, bet);
        nextPlayerHand();
        break;
      case "raise":
        this.betting.playerBets(player, bet);
        nextPlayerHand();
        break;
      default:
        console.log(`ActionButton#handleClick value: ${value}`);
    }
  }

  render() {
    const { value } = this.props;

    return (
      <button type="button" onClick={this.handleClick} value={ value }>
        { value }
      </button>
    );
  }
}

export default ActionButton;
