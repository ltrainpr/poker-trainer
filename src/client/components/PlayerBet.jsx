import React, { Component } from "react";
var _ = require('underscore');

class PlayerBet extends Component {
  render() {
    var bet = this.props.bet || 0
    return (
      <h3>Player Bet: {bet}</h3>
    )
  }
}

export default PlayerBet;