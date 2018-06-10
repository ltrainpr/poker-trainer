import React, { Component } from "react";

class ActionButton extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var actionIndex, player;
    switch (this.props.value) {
      case "fold":
        actionIndex = this.props.game.betting.playerFolds(this.props.player);
        break;
      case "call":
        actionIndex = this.props.game.betting.playerBets(this.props.player, 2);
        break;
      case "bet":
        console.log("handleClick bet");
        actionIndex = this.props.game.betting.playerBets(
          this.props.player,
          this.props.bet
        );
        break;
      default:
        console.log("ActionButton#handleClick value: " + this.props.value);
        return;
    }

    player = this.props.game.players[actionIndex];
    this.props.nextPlayerHand(player.hand);
  }

  render() {
    return (
      <button onClick={this.handleClick} value={this.props.value}>
        {this.props.action}
      </button>
    );
  }
}

export default ActionButton;
