import React from "react";
import BettingContainer from "./BettingContainer";
import CommunityCards from "./CommunityCards";
import HighestHand from "./HighestHand"
import Button from "../game/button";
import HandIsOverButton from "./HandIsOverButton"

const _ = require('underscore');
const Game = require("../game/game");

class App extends React.Component {
  constructor() {
    super();
    this.button = Button();
    const startingButton = this.button.generateButtonIndex();
    const underTheGunIndex = this.button.underTheGunIndex(startingButton)

    this.game = this.game || Game();
    this.players = this.game.players
    this.dealer = this.game.dealer
    this.betting = this.game.betting
    this.dealer.deal(this.players);

    const player = this.players[this.getPlayerToActIndex(underTheGunIndex)];

    this.betting.blinds(this.players, startingButton);

    this.isBettingRoundOver = this.isBettingRoundOver.bind(this);
    this.playersInHand = this.playersInHand.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.isHandOver = this.isHandOver.bind(this);
    this.evaluateHands = this.evaluateHands.bind(this);
    this.clearPlayerBets = this.clearPlayerBets.bind(this);
    this.updatePot = this.updatePot.bind(this);
    this.newHand = this.newHand.bind(this);
    this.resetBet = this.resetBet.bind(this);
    this.bettingAmount = this.bettingAmount.bind(this);
    this.setPlayer = this.setPlayer.bind(this);

    this.nextPlayerInHand = this.nextPlayerInHand.bind(this);
    this.playersInHand = this.playersInHand.bind(this);
    this.playerClosestToButton = this.playerClosestToButton.bind(this);
    this.nextPlayerHand = this.nextPlayerHand.bind(this);
    this.playerAction = this.playerAction.bind(this);
    this.getNextPlayer = this.getNextPlayer.bind(this);
    this.getPlayerToActIndex = this.getPlayerToActIndex.bind(this);
    this.riverRound = this.riverRound.bind(this);

    this.state = {
      round: App.PreFlop,
      bet: "",
      highestBet: 0,
      evaluatedHands: [],
      pot: 0,
      player
    }
  }

  static get PreFlop() { return 'preFlop'; }

  static get River() { return 'river'; }

  getPlayerToActIndex(indx) {
    return this.betting.playerToActIndex(indx);
  }

  setPlayer(player) { this.setState({ player }); }

  getNextPlayer() {
    return (this.isBettingRoundOver() ? this.playerClosestToButton() : this.nextPlayerInHand());
  }

  evaluateHands() {
    const players = this.playersInHand();
    return this.dealer.evaluateHands(players);
  }

  newHand() {
    this.dealer.nextHand(this.players);
    // move button, recalculate player under the gun, set player in state
    this.setState({
      round: App.PreFlop,
      bet: "",
      highestBet: 0,
      evaluatedHands: [],
      pot: 0
    })
  }

// Possible extraction/refactor
  isHandOver(bettingRoundComplete) {
    return (
      this.playersInHand().length === 1 ||
        (this.riverRound() && bettingRoundComplete)
    );
  }

  riverRound() {
    const { round } = this.state;
    return App.River === round;
  }

  clearPlayerBets() {
    this.betting.clearPlayerBets(this.playersInHand());
  }

  isBettingRoundOver() {
    const bettingRoundComplete = this.betting.betsMatch(this.playersInHand());
    const handIsOver = this.isHandOver(bettingRoundComplete);

    if (bettingRoundComplete) {
      this.clearPlayerBets();
      this.setState({
        highestBet: 0,
        round: this.nextRound()
      })
    } else {
      this.setState({
        highestBet: this.betting.highestBet(this.players)
      })
    }

    if (handIsOver) {
      this.setState({
        evaluatedHands: this.evaluateHands(),
        round: App.PreFlop
      })
    }

    return bettingRoundComplete;
  }

  playersInHand() {
    return this.betting.playersInHand(this.players);
  }

  nextRound() {
    const { round } = this.state;
    return this.dealer.nextRound(round);
  }

  updatePot() {
    const { evaluatedHands, bet, pot } = this.state;
    if (_.isEmpty(evaluatedHands)) {
      const betAsInteger = parseInt(bet, 10) || 0;
      this.setState({ pot: pot + betAsInteger });
    } else {
      this.setState({ pot: 0 });
    }
  }

  resetBet() { this.setState({bet: ""}); }

  bettingAmount(bet) { this.setState({bet: parseInt(bet, 10) }); }

  nextPlayerInHand() {
    const { player } = this.state;
    const players = this.playersInHand();
    const playerFound = this.betting.findNextPlayer(players, player.seatIndex);
    return playerFound || players[0];
  }

  playerClosestToButton() {
    return this.betting.playerClosestToButton(this.playersInHand())
  }

  nextPlayerHand() {
    this.updatePot();
    this.resetBet();
    this.setPlayer(this.getNextPlayer());

    return true;
  }

  playerAction(value) {
    const { highestBet, bet, player } = this.state;
    this.betting.playerAction(value, player, highestBet, bet);
    this.nextPlayerHand();
  }

  render() {
    const { highestBet, evaluatedHands, pot, bet, player } = this.state;

    return (
      <div>
        <div>
          <BettingContainer
            highestBet={highestBet}
            pot={pot}
            bettingAmount={this.bettingAmount}
            bet={bet}
            player={player}
            playerAction={this.playerAction} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) => {
              const key = `${card.value} ${card.suit}`
              return (<CommunityCards key={key} card={card} id={key} />)
            })
          }
        </div>
        <HandIsOverButton
          evaluatedHands={evaluatedHands}
          newHand={this.newHand} />
        <div>
          {
            evaluatedHands.map((obj, idx) =>
              <HighestHand key={idx} result={obj.highHand} cards={obj.cards} />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;