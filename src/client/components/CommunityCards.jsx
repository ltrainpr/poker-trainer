import React, { Component } from 'react';

class CommunityCards extends Component {
  imagePath(card) {
    return (
      "deck_of_cards/" + card.value.toString() + card.suit.charAt(0).toUpperCase() + ".png"
    )
  }

  render() {
    return (
        <img id={this.props.card.value + "_" + this.props.card.suit} src={this.imagePath(this.props.card)} className="card" value={this.props.card.value} />
    )
  }
}

export default CommunityCards;