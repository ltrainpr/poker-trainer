import React, { Component } from 'react';

class PlayerCards extends Component {
  static imagePath(card) {
    return (
      `deck_of_cards/${card.value.toString()}${card.suit.charAt(0).toUpperCase()}.png`
    )
  }

  render() {
    const {hand} = this.props;
    // if (hand.length === 0) { return null; }

    const firstCard = hand[0];
    const secondCard = hand[1];

    return (
      <div>
        <img id={`${firstCard.value}_${firstCard.suit}`} src={PlayerCards.imagePath(firstCard)} className="card" value={firstCard.value} alt="player first card"/>

        <img id={ `${secondCard.value}_${secondCard.suit}` } src={PlayerCards.imagePath(secondCard)} className="card" value={secondCard.value} alt="player second card"/>
      </div>
    )
  }
}

export default PlayerCards;