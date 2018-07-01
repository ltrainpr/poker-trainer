import React, { Component } from "react";

class BetAmount extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(evt) {
    const { updateFilter } = this.props;
    updateFilter(evt.target.value);
  }

  render() {
    const { bet } = this.props;
    return (
      <input
        type="text"
        onChange={this.handleFilterChange}
        placeholder="Betting Amount"
        value={ bet }
      />
    );
  }
}

export default BetAmount;
