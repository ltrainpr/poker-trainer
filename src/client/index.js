import React from "react";
import { render } from "react-dom";
import ActionButton from "./components/ActionButton.jsx";
import BettingContainer from "./components/BettingContainer.jsx";
import styles from "./scss/application.scss";

var Game = require("./game/game");
var game = game || Game();

function startGame() {
  var players = game.players;
  var button = game.button;
  var dealer = game.dealer;
  var betting = game.betting;
  var smallBlind, bigBlind;
  var startingButton = button.generateButtonIndex();

  [smallBlind, bigBlind] = betting.blinds(players, startingButton);
  dealer.deal(players);

  var action = game.betting.playerToAct(
    players,
    game.button.underTheGunIndex(startingButton)
  );

  return action;
}

function Action() {
  var player = startGame();

  return (
    <div>
      <BettingContainer player={player} game={game}/>
    </div>
  );
}

render(<Action />, document.getElementById("root"));
