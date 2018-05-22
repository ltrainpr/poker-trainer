import React, { Component } from 'react';

class ActionButton extends Component {
  render() {
    return (
      <button>{props.action}</button>
    )
  }
}

export default ActionButton;