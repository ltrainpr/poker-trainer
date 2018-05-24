import React from 'react';
import { render } from 'react-dom';
import ActionButton from './components/ActionButton.jsx';
import ShowHand from './components/ShowHand.jsx';
import styles from './scss/application.scss';

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

  var action = game.betting.playerToAct(players, game.button.underTheGunIndex(startingButton));

  // action stops here until player looks at cards;
  console.log("action stops here until player looks at cards");
  console.log(action.hand);

  // Setup event handlers for betting or folding;
  return action.hand

}

function Action() {
  var hand = startGame();

  return (
    <div>
      <div>
        <ShowHand value={hand[0].value} suit={hand[0].suit} />
        <ShowHand value={hand[1].value} suit={hand[1].suit} />
      </div>
      <div>
        <ActionButton action="Call" />
        <ActionButton action="Bet" />
        <ActionButton action="Raise" />
        <ActionButton action="Fold" />
      </div>
    </div>
  );
}


render(
  <Action />,
  document.getElementById('root')
);