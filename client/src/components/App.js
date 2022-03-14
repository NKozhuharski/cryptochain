import React, { Component } from "react";
import {Link} from 'react-router-dom'
import logo from "./assets/logo2.png";

class App extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
    fetch("http://localhost:3000/api/wallet-info")
      .then((response) => response.json())
      .then((data) => this.setState({ walletInfo: data }));
  }

  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div className="App">
        <img className="logo" src={logo}></img>
        <div>Welcome ro the blockchain...</div>
        <br />
        <div><Link to='/blocks'>Blocks</Link></div>
        <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
        <br />
        <div className="WalletInfo">
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </div>
      </div>
    );
  }
}

export default App;
