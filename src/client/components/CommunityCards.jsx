import React, { Component } from 'react';

class CommunityCards extends Component {
  imagePath(card) {
    return (
      "deck_of_cards/" + card.value.toString() + card.suit.charAt(0).toUpperCase() + ".png"
    )
  }

  render() {
    return (
      <div>
        <img id={card.value + "_" + card.suit} src={this.imagePath(card)} className="card" value={card.value} />
      </div>
    )
  }
}

export default CommunityCards;