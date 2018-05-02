var Player = require("./player");

var Game = function() {
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

  var players = players || createPlayers();

  function createPlayers() {
    var playersArray = [];
    for (var i = 9; i >= 0; i--) {
      playersArray.push(Player(names[i]))
    };

    return playersArray;
  }

  return {
    players:  players,
    button:   4
  }
}

module.exports = Game