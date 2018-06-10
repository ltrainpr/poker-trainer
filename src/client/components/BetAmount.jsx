import React, { Component } from "react";

class BetAmount extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      inputValue: ""
    };
  }

  handleFilterChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    this.props.updateFilter(evt.target.value);
  }

  render() {
    return (
      <input
        type="text"
        ref="filterInput"
        onChange={this.handleFilterChange}
        placeholder="Betting Amount"
      />
    );
  }
}

export default BetAmount;
