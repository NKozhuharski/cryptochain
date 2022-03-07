import React, { Component } from "react";

class App extends Component {
  state = { walletInfo: {} };

    componentDidMount() {
        fetch('http://localhost:3000/api/wallet-info')
        .then(response => response.json())
        .then(data => this.setState({walletInfo: data}));

    }

  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div>
        <div>
          Welcome ro the blockchain...
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </div>
      </div>
    );
  }
}

export default App;
