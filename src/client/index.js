import React from "react";
import { render } from "react-dom";
import BettingContainer from "./components/BettingContainer.jsx";
import styles from "./scss/application.scss";

var Game = require("./game/game");

class PokerGame extends React.Component {
  render() {
    var game = game || Game();
    game.dealer.deal(game.players);

    return (
      <div>
        <BettingContainer
          players={game.players}
          button={game.button} />
      </div>
    );
  }
}

render(<PokerGame />, document.getElementById("root"));
