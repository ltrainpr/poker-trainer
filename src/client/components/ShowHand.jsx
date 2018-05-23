import React, { Component } from 'react';

class ShowHand extends Component {
  render() {
    return (
      <h1 value={this.props.value}>{this.props.suit}</h1>
    )
  }
}

export default ShowHand;