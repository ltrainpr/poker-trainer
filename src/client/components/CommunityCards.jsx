import React, { Component } from 'react';

class CommunityCards extends Component {
  imagePath() {
    const { card } = this.props;
    return (
      `deck_of_cards/${card.value.toString()}${card.suit.charAt(0).toUpperCase()}.png`
    )
  }

  render() {
    const { card } = this.props;
    return (
      <div>
        <img id={`card.value ${card.suit}`} src={this.imagePath()} className="card" value={card.value} alt="card" />
      </div>
    )
  }
}

export default CommunityCards;