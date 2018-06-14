import React, { Component } from 'react';

class PlayerCards extends Component {
  imagePath(card) {
    return (
      "deck_of_cards/" + card.value.toString() + card.suit.charAt(0).toUpperCase() + ".png"
    )
  }

  render() {
    var firstCard = this.props.hand[0];
    var secondCard = this.props.hand[1];

    return (
      <div>
        <img id={firstCard.value + "_" + firstCard.suit} src={this.imagePath(firstCard)} className="card" value={firstCard.value} />

        <img id={secondCard.value +  "_" + secondCard.suit} src={this.imagePath(secondCard)} className="card" value={secondCard.value} />
      </div>
    )
  }
}

export default PlayerCards;