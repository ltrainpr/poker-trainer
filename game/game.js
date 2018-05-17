var _ = require('underscore');
var Player = require("./player");
var Dealer = require("./dealer");
var Betting = require("./betting");


var Game = function() {
  var pot = 0;
  var players = players || createPlayers();
  var button = button || buttonIndex();
  var dealer = dealer || Dealer();
  var betting = betting || Betting();

  return { players, button, dealer, betting };
};

function buttonIndex() {
  function generateButtonIndex() { return _.random(9); }
  function moveButton(button) { return button === 9 ? 0 : button + 1; }
  function getButtonPosition() { return button; }
  function underTheGunIndex(button) { return button + 3; }

  return { generateButtonIndex, moveButton, getButtonPosition, underTheGunIndex };
}

function createPlayers() {
  var names =
  [
    "Amy",
    "Howard",
    "Scott",
    "Clark",
    "Nate",
    "Karen",
    "Me",
    "Dave",
    "Rachel",
    "Josh"
  ];

  var playersArray = [];
  for (var i = 9; i >= 0; i--) {
    playersArray.push(Player(names[i]));
  }

  return playersArray;
}


module.exports = Game;