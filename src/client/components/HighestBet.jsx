import React, { Component } from "react";

const _ = require('underscore');

class HighestBet extends Component {
  constructor(props) {
    super(props);
    this.highestBet = this.highestBet.bind(this);
  }

  highestBet() {
    const { players } = this.props;
    const maxBet = _.max(players, (player) =>  player.bet );
    return _.isEmpty(maxBet) ? {bet: 0} : maxBet;
  }

  render() {
    return (
      <h3>Highest Bet: {this.highestBet().bet}</h3>
    )
  }
}

export default HighestBet;