import React, { Component } from "react";

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    const { playerAction } = this.props;
    playerAction(evt.target.value.toLowerCase());
  }

  render() {
    const { value } = this.props;

    return (
      <button type="button" onClick={this.handleClick} value={ value }>
        { value }
      </button>
    );
  }
}

export default ActionButton;
