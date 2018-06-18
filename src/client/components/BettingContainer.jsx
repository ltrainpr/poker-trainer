import React, { Component } from "react";
import ShowHand from "./ShowHand.jsx";
import BetAmount from "./BetAmount.jsx";
import ActionButton from "./ActionButton.jsx";
import Betting from "../game/betting.js";
import Button from "../game/button.js";
import Pot from "./Pot.jsx";


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

    this.state = {
      bet: "",
      playerIndex: underTheGunIndex,
      player: player,
      hand: player.hand,
      pot: 0
    };
  }

  nextPlayerHand() {
    var idx = this.state.playerIndex += 1;
    var nextPlayerIndex = this.getPlayerToActIndex(idx);
    var player = this.props.players[nextPlayerIndex];

    this.setState({
      pot: (parseInt(this.state.pot, 10) + parseInt(this.state.bet, 10)),
      bet: "",
      playerIndex: nextPlayerIndex,
      player: player,
      hand: player.hand
    });
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
          <ActionButton
            value="Call"
            player={this.state.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            players={this.props.players}
          />
          <ActionButton
            value="Bet"
            player={this.state.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            players={this.props.players}
          />
          <ActionButton
            value="Raise"
            player={this.state.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            players={this.props.players}
          />
          <ActionButton
            value="Fold"
            player={this.state.player}
            bet={this.state.bet}
            nextPlayerHand={this.nextPlayerHand}
            players={this.props.players}
          />
        </div>
        <div>
          <Pot pot={this.state.pot} />
        </div>
      </div>
    );
  }
}

export default BettingContainer;
