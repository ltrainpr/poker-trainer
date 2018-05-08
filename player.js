var _ = require('underscore');

var Player = function(name) {
  var playingStyles =
  [
    "Tight passive",
    "Tight aggressive",
    "Loose passive",
    "Loose aggressive"
  ];

  return {
    name: name,
    hand: [],
    type: playingStyles[_.random(3)],
    money: 200
  };
};

module.exports = Player;