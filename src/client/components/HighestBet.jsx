import React, { Component } from "react";
var _ = require('underscore');

class HighestBet extends Component {
  render() {
    return (
      <h3>Highest Bet: {this.props.highestBet}</h3>
    )
  }
}

export default HighestBet;