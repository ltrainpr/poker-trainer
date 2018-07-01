const _ = require('underscore');
const Player = require("./player");
const Dealer = require("./dealer");
const Betting = require("./betting");
const Button = require("./button");

function createPlayers() {
  let player;
  const names =
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

  const playersArray = [];
  const shuffledNames = _.shuffle(names)
  for (let indx = 0, { length } = names; indx < length; indx += 1) {
    player = Player(shuffledNames[indx], indx);
    playersArray.push(player);
  }

  return playersArray;
}

function Game() {
  const players = createPlayers();
  const button = Button();
  const dealer = Dealer();
  const betting = Betting();

  return { players, button, dealer, betting };
};


module.exports = Game;