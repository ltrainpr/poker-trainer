import React, { Component } from "react";
import ShowHand from "./ShowHand";
import BetAmount from "./BetAmount";
import ActionButton from "./ActionButton";
import Betting from "../game/betting";
import Button from "../game/button";
import Pot from "./Pot";
import HighestBet from "./HighestBet"

const _ = require('underscore');


class BettingContainer extends Component {
  constructor(props) {
    super(props);
    const { players } = this.props;

    this.button = Button();
    const startingButton = this.button.generateButtonIndex();
    const underTheGunIndex = this.button.underTheGunIndex(startingButton)
    const player = players[BettingContainer.getPlayerToActIndex(underTheGunIndex)];

    const betting = Betting();
    betting.blinds(players, startingButton);

    this.bettingAmount = this.bettingAmount.bind(this);
    this.nextPlayerHand = this.nextPlayerHand.bind(this);
    this.nextPlayerInHandIndex = this.nextPlayerInHandIndex.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);

    this.state = {
      bet: "",
      player,
      hand: player.hand,
      pot: 0
    };
  }

  static getPlayerToActIndex(indx) {
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

  nextPlayerInHandIndex() {
    const { players } = this.props;
    const { player } = this.state;
    let nextPlayerInHandIndex = BettingContainer.getPlayerToActIndex(player.seatIndex + 1);
    let nextPlayer = this.nextPlayer(nextPlayerInHandIndex);

    for (let count = players.length - 1; count >= 0; count-= 1) {
      if(nextPlayer.hand.length !== 0) { return nextPlayer; }
      nextPlayerInHandIndex = BettingContainer.getPlayerToActIndex(nextPlayer.seatIndex + 1);
      nextPlayer = this.nextPlayer(nextPlayerInHandIndex);
    };

    return nextPlayerInHandIndex;
  }

  nextPlayer(idx) {
    const { players } = this.props;
    return _.find(players, (pokerPlayer) => pokerPlayer.seatIndex === idx )
  }

  nextPlayerHand() {
    const { bet, pot } = this.state;
    const player = this.nextPlayerInHandIndex();
    const betAsInteger = bet.length === 0 ? 0 : parseInt(bet, 10)

    this.setState({
      pot: pot + betAsInteger,
      bet: "",
      player,
      hand: player.hand
    });
  }

  bettingAmount(bet) {
    this.setState({ bet });
  }

  render() {
    const { hand, player, bet, pot } = this.state;
    const { players } = this.props;

    return (
      <div>
        <div>
          <ShowHand hand={hand} />
        </div>
        <div>{player.name}</div>
        <div>
          <BetAmount updateFilter={this.bettingAmount} bet={bet} />
        </div>
        <div>
          <ActionButton
            value="Call"
            player={player}
            bet={bet}
            nextPlayerHand={this.nextPlayerHand}
            players={players}
          />
          <ActionButton
            value="Bet"
            player={player}
            bet={bet}
            nextPlayerHand={this.nextPlayerHand}
            players={players}
          />
          <ActionButton
            value="Raise"
            player={player}
            bet={bet}
            nextPlayerHand={this.nextPlayerHand}
            players={players}
          />
          <ActionButton
            value="Fold"
            player={player}
            bet={bet}
            nextPlayerHand={this.nextPlayerHand}
            players={players}
          />
        </div>
        <div>
          <Pot pot={pot} />
        </div>
        <div>
          <HighestBet players={players} />
        </div>
      </div>
    );
  }
}

export default BettingContainer;
