var Game = require("./game");
var game = game || Game();

function poker() {
  var players = game.players;
  var button = game.button;
  var dealer = game.dealer;
  var betting = game.betting;
  var smallBlind, bigBlind;
  var startingButton = button.generateButtonIndex();


  [smallBlind, bigBlind] = betting.blinds(players, startingButton);
  dealer.deal(players);

  var action = game.betting.playerToAct(players, game.button.underTheGunIndex(startingButton))

  // action stops here until player looks at cards;
  console.log("action stops here until player looks at cards");
  console.log(action.hand);

  // Setup event handlers for betting or folding;
  betting.playerFolds(action);
  console.log(action.hand);
}

poker();