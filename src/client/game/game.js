var _ = require('underscore');
var Player = require("./player");
var Dealer = require("./dealer");
var Betting = require("./betting");
var Button = require("./button");

var Game = function() {
  var pot = 0;
  var players = players || createPlayers();
  var button = button || Button();
  var dealer = dealer || Dealer();
  var betting = betting || Betting();

  return { players, button, dealer, betting };
};

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