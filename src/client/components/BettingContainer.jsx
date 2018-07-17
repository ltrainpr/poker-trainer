import React from "react";
import ShowHand from "./ShowHand";
import BetAmount from "./BetAmount";
import ActionButton from "./ActionButton";
import Pot from "./Pot";
import HighestBet from "./HighestBet"

const BettingContainer = ({ highestBet, pot, bettingAmount, bet, player, playerAction }) => (
  <div>
    <div>
      <ShowHand hand={player.hand} />
    </div>
    <div>{player.name}</div>
    <div>
      <BetAmount updateFilter={bettingAmount} bet={parseInt(bet, 10) || 0} />
    </div>
    <div>
      {
        ["Check", "Call", "Bet", "Raise", "Fold"].map(action =>
          <ActionButton
            key={action}
            value={action}
            playerAction={playerAction}
          />
        )
      }
    </div>
    <div>
      <Pot pot={pot} />
    </div>
    <div>
      <HighestBet bet={highestBet} />
    </div>
  </div>
)

export default BettingContainer;
