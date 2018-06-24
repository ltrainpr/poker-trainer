import React, { Component } from "react";
import ShowHand from "./ShowHand.jsx";
import BetAmount from "./BetAmount.jsx";
import ActionButton from "./ActionButton.jsx";
import Betting from "../game/betting.js";
import Button from "../game/button.js";
import Pot from "./Pot.jsx";
import HighestBet from "./HighestBet.jsx"
var _ = require('underscore');


class BettingContainer extends Component {
  constructor(props) {
    super(props);
    this.button = Button();
    var startingButton = this.button.generateButtonIndex();
    var underTheGunIndex = this.button.underTheGunIndex(startingButton)
    var player = this.props.players[this.getPlayerToActIndex(underTheGunIndex)];

    var betting = Betting();
    betting.blinds(this.props.players, startingButton);

    this.bettingAmount = this.bettingAmount.bind(this);
    this.nextPlayerHand = this.nextPlayerHand.bind(this);
    this.nextPlayerInHandIndex = this.nextPlayerInHandIndex.bind(this);
    this.getPlayerToActIndex = this.getPlayerToActIndex.bind(this);

    this.state = {
      bet: "",
      playerIndex: underTheGunIndex,
      player: player,
      hand: player.hand,
      pot: 0
    };
  }

  nextPlayerHand() {
    var player = this.nextPlayerInHandIndex();
    var bet = this.state.bet.length === 0 ? 0 : parseInt(this.state.bet, 10)
    player["bet"] = bet;

    this.setState({
      pot: this.state.pot + bet,
      bet: "",
      playerIndex: player.seatIndex,
      player: player,
      hand: player.hand
    });
  }

  nextPlayerInHandIndex() {
    var nextPlayer;
    var nextPlayerInHandIndex = this.getPlayerToActIndex(this.state.player.seatIndex + 1);

    for (var count = this.props.players.length - 1; count >= 0; count--) {
      nextPlayer = _.find(this.props.players, (player) => { return player.seatIndex === nextPlayerInHandIndex });
      if(nextPlayer.hand.length !== 0) { return nextPlayer; }
      nextPlayerInHandIndex = this.getPlayerToActIndex(nextPlayer.seatIndex + 1);
    };
  }

  getPlayerToActIndex(indx) {
    switch (indx) {
      case 10:
        return 0;
      case 11:
        return 1;
      case 12:
        return 2;
      default:
        return indx;
    }
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
          <BetAmount updateFilter={this.bettingAmount} bet={this.state.bet} />
        </div>
        <div>
          {
            this.props.actions.map((action) => {
              return (
                <ActionButton
                  key={action}
                  value={action}
                  player={this.state.player}
                  bet={this.state.bet}
                  nextPlayerHand={this.nextPlayerHand}
                  players={this.props.players}
                />
              )
            })
          }
        </div>
        <div>
          <Pot pot={this.state.pot} />
        </div>
        <div>
          <HighestBet players={this.props.players} />
        </div>
      </div>
    );
  }
}

export default BettingContainer;
