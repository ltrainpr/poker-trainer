const _ = require('underscore');

function Player(name, idx) {
  const playingStyles =
  [
    "Tight passive",
    "Tight aggressive",
    "Loose passive",
    "Loose aggressive"
  ];

  return {
    name,
    hand: [],
    type: playingStyles[_.random(3)],
    money: 200,
    seatIndex: idx
  };
};

module.exports = Player;