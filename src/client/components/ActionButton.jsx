import React, { Component } from "react";
import Betting from "../game/betting.js";

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.betting = Betting();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var actionIndex;
    switch (this.props.value.toLowerCase()) {
      case "fold":
        this.betting.playerFolds(this.props.player);
        this.props.nextPlayerHand();
        break;
      case "call":
        this.betting.playerBets(this.props.player, 2);
        this.props.nextPlayerHand();
        break;
      case "bet":
        this.betting.playerBets(this.props.player, this.props.bet);
        this.props.nextPlayerHand();
        break;
      default:
        console.log("ActionButton#handleClick value: " + this.props.value);
        return;
    }
  }

  render() {
    return (
      <button onClick={this.handleClick} value={this.props.value}>
        {this.props.value}
      </button>
    );
  }
}

export default ActionButton;
