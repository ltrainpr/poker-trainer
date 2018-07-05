import React from "react";
import BettingContainer from "./BettingContainer";
import CommunityCards from "./CommunityCards";
import HighestHand from "./HighestHand"

const _ = require('underscore');
const Game = require("../game/game");
const HighHand = require("../high_hand/high_hand")

class App extends React.Component {
  constructor() {
    super();
    this.game = this.game || Game();
    this.players = this.game.players
    this.dealer = this.game.dealer
    this.betting = this.game.betting
    this.dealer.deal(this.players);

    this.isBettingRoundOver = this.isBettingRoundOver.bind(this);
    this.playersInHand = this.playersInHand.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.isHandOver = this.isHandOver.bind(this);
    this.betsMatch = this.betsMatch.bind(this);
    this.evaluateHands = this.evaluateHands.bind(this);
    this.clearPlayerBets = this.clearPlayerBets.bind(this);

    this.state = {
      round: 'preFlop',
      highestBet: 0,
      evaluatedHands: []
    }
  }

  betsMatch() {
    const highestBet = this.betting.highestBet(this.players)
    this.setState({highestBet})
    return _.all(this.playersInHand(), (player) =>
      (player.bet && player.bet === highestBet))
  }

  evaluateHands() {
    const players = this.playersInHand()
    const communityCards = this.dealer.communityCards()

     return players.map(player => {
      const cards = player.hand.concat(communityCards);
      return {highHand: HighHand(cards), cards: player.hand};
    })
  }

  isHandOver(bettingRoundComplete) {
    const { round } = this.state;

    if (this.playersInHand().length === 1) {
      this.dealer.nextHand(this.players)
      return true;
    }

    if (round === 'river' && bettingRoundComplete) {
      this.setState({
        evaluatedHands: this.evaluateHands()
      })
      // this.dealer.nextHand(this.players)
      return true
    }

    return false;
  }

  clearPlayerBets() {
    this.playersInHand().forEach(pokerPlayer => {
      const player = pokerPlayer;
      player.bet = 0;
      return player;
    })
  }

  isBettingRoundOver() {
    const bettingRoundComplete = this.betsMatch();
    this.isHandOver(bettingRoundComplete);

    if(bettingRoundComplete) {
      this.clearPlayerBets();
      this.setState({
        round: this.nextRound(),
        highestBet: 0
      })
    } else {
      this.setState({
        highestBet: this.betting.highestBet(this.players)
      })
    }
  }

  playersInHand() {
    return this.players.filter(player => (player.hand.length === 2))
  }

  nextRound() {
    const { round } = this.state;

    switch(round) {
      case "preFlop":
        this.dealer.dealFlop();
        return "flop";
      case "flop":
        this.dealer.dealNext();
        return "turn";
      case "turn":
        this.dealer.dealNext();
        return "river";
      default:
        return "preFlop";
    }
  }

  render() {
    const { highestBet } = this.state;

    return (
      <div>
        <div>
          <BettingContainer
            players={this.game.players}
            button={this.game.button}
            isBettingRoundOver={this.isBettingRoundOver}
            highestBet={highestBet} />
        </div>
        <div>
          {
            this.dealer.communityCards().map((card) => {
              const key = `${card.value} ${card.suit}`
              return (<CommunityCards key={key} card={card} id={key} />)
            })
          }
        </div>
        <div>
          {
            this.state.evaluatedHands.map((obj, idx) => {
              return <HighestHand key={idx} result={obj.highHand} cards={obj.cards} />
            })
          }
        </div>
      </div>
    );
  }
}

export default App;