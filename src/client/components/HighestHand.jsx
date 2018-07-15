import React from "react";
import ShowHand from "./ShowHand";

const HighestHand = ({ result, cards }) => (
  <div>
    <h3>{JSON.stringify(result)}</h3>
    <ShowHand hand={cards} />
  </div>
  );

export default HighestHand;