import React, { Component } from 'react';

class CommunityCards extends Component {
  imagePath() {
    const { card } = this.props;
    return (
      `deck_of_cards/${card.value.toString()}${card.suit.charAt(0).toUpperCase()}.png`
    )
  }

  render() {
    const { card, id } = this.props;
    return (
      <img id={id} src={this.imagePath()} className="card" value={card.value} alt="card" />
    )
  }
}

export default CommunityCards;