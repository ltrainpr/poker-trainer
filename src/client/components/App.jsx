import React from "react";
import BettingContainer from "./BettingContainer";
import CommunityCards from "./CommunityCards";
import HighestHand from "./HighestHand"
import Button from "../game/button";
import HandIsOverButton from "./HandIsOverButton"

const _ = require('underscore');
const Game = require("../game/game");
const HighHand = require("../high_hand/high_hand")

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

    const player = this.players[App.getPlayerToActIndex(underTheGunIndex)];

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

    this.state = {
      round: App.PreFlop,
      bet: "",
      highestBet: 0,
      evaluatedHands: [],
      pot: 0,
      underTheGunIndex,
      player
    }
  }

  static get PreFlop() { return 'preFlop'; }

  static get Flop() { return 'flop'; }

  static get Turn() { return 'turn'; }

  static get River() { return 'river'; }

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

  setPlayer(player) {
    this.setState({
      player
    });
  }

  evaluateHands() {
    const players = this.playersInHand()
    const communityCards = this.dealer.communityCards()

     return players.map(player => {
      const cards = player.hand.concat(communityCards);
      return {highHand: HighHand(cards), cards: player.hand};
    })
  }

  newHand() {
    this.dealer.nextHand(this.players);
    this.dealer.deal(this.players);
    this.setState({ pot: 0 })
  }

  isHandOver(bettingRoundComplete) {
    const { round } = this.state;

    return (
      this.playersInHand().length === 1 ||
        (round === App.River && bettingRoundComplete)
    );
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

    switch(round) {
      case App.PreFlop:
        this.dealer.dealFlop();
        return App.Flop;
      case App.Flop:
        this.dealer.dealNext();
        return App.Turn;
      case App.Turn:
        this.dealer.dealNext();
        return App.River;
      default:
        return App.PreFlop;
    }
  }

  updatePot() {
    const { evaluatedHands, bet } = this.state;
    if (_.isEmpty(evaluatedHands)) {
      const { pot } = this.state;
      const betAsInteger = parseInt(bet, 10) || 0;
      this.setState({ pot: pot + betAsInteger });
    } else {
      this.setState({ pot: 0 });
    }
  }

  resetBet() {
    this.setState({bet: ""});
  }

  bettingAmount(bet) {
    this.setState({bet: parseInt(bet, 10) });
  }

  render() {
    const { underTheGunIndex, highestBet, evaluatedHands, pot, bet, player } = this.state;

    return (
      <div>
        <div>
          <BettingContainer
            players={this.game.players}
            player={player}
            underTheGunIndex={underTheGunIndex}
            isBettingRoundOver={this.isBettingRoundOver}
            highestBet={highestBet}
            pot={pot}
            updatePot={this.updatePot}
            resetBet={this.resetBet}
            bettingAmount={this.bettingAmount}
            bet={bet}
            setPlayer={this.setPlayer} />
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