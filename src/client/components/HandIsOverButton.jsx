import React, { Component } from "react";

require("../scss/hand_is_over_button.scss")

const _ = require('underscore');

class HandIsOverButton extends Component {
  constructor(props) {
    super(props)
    this.hideDisplayNextHand = this.hideDisplayNextHand.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  hideDisplayNextHand() {
    const { evaluatedHands } = this.props;
    return _.isEmpty(evaluatedHands);
  }

  handleClick(evt) {
    evt.preventDefault();
    const { newHand } = this.props;
    newHand();
  }

  render() {
    return (
      <button className={`deal-next-hand ${this.hideDisplayNextHand() ? 'hidden' : ''}`} onClick={this.handleClick} type="button" >
        Deal Next Hand
      </button>
    )
  }
}

export default HandIsOverButton;