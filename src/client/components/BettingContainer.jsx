import React, { Component } from "react";
import ShowHand from "./ShowHand";
import BetAmount from "./BetAmount";
import ActionButton from "./ActionButton";
import Betting from "../game/betting";
import Pot from "./Pot";
import HighestBet from "./HighestBet"

const _ = require('underscore');

class BettingContainer extends Component {
  constructor(props) {
    super(props);

    this.betting = Betting();
    this.nextPlayerHand = this.nextPlayerHand.bind(this);
    this.nextPlayerInHandIndex = this.nextPlayerInHandIndex.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.playersInHand = this.playersInHand.bind(this);
    this.playerAction = this.playerAction.bind(this);
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
    const { players, player } = this.props;
    let nextPlayerInHandIndex = BettingContainer.getPlayerToActIndex(player.seatIndex + 1);
    let nextPlayer = this.nextPlayer(nextPlayerInHandIndex);

    for (let count = players.length - 1; count >= 0; count-= 1) {
      if(nextPlayer.hand.length !== 0) { return nextPlayer; }
      nextPlayerInHandIndex = BettingContainer.getPlayerToActIndex(nextPlayer.seatIndex + 1);
      nextPlayer = this.nextPlayer(nextPlayerInHandIndex);
    };

    return nextPlayer;
  }

  nextPlayer(idx) {
    const { players } = this.props;
    return _.find(players, (pokerPlayer) => pokerPlayer.seatIndex === idx )
  }

  playersInHand() {
    const { players } = this.props;
    return this.betting.playersInHand(players);
  }

  playerUnderTheGun() {
    const { players } = this.props;
    const playersInHand = this.betting.playersInHand(players);
    return _.min(playersInHand, (player) => player.seatIndex);
  }

  nextPlayerHand() {
    const { isBettingRoundOver, updatePot, resetBet, setPlayer } = this.props;
    const bettingRoundComplete = isBettingRoundOver();
    const player = bettingRoundComplete ? this.playerUnderTheGun() : this.nextPlayerInHandIndex();

    updatePot();
    resetBet();
    setPlayer(player);

    return true;
  }

  playerAction(value) {
    const { highestBet, bet, player } = this.props;

    switch (value.toLowerCase()) {
      case "fold":
        this.betting.playerFolds(player);
        break;
      case "call":
        this.betting.playerBets(player, highestBet);
        break;
      case "bet":
        this.betting.playerBets(player, bet);
        break;
      case "raise":
        this.betting.playerBets(player, bet);
        break;
      default:
        console.log(`ActionButton#handleClick value: ${value}`);
    }
    this.nextPlayerHand();
  }

  render() {
    const { highestBet, pot, bettingAmount, bet, player } = this.props;
    const betAsInteger = parseInt(bet, 10) || 0;

    return (
      <div>
        <div>
          <ShowHand hand={player.hand} />
        </div>
        <div>{player.name}</div>
        <div>
          <BetAmount updateFilter={bettingAmount} bet={betAsInteger} />
        </div>
        <div>
          {
            ["Check", "Call", "Bet", "Raise", "Fold"].map(action =>
              <ActionButton
                key={action}
                value={action}
                playerAction={this.playerAction}
              />
            )
          }
        </div>
        <div>
          <Pot pot={pot} />
        </div>
        <div>
          <HighestBet bet={highestBet} />
        </div>
      </div>
    );
  }
}

export default BettingContainer;
