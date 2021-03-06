import React, { Component } from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import { Button } from "react-bootstrap";
import history from "../history";

const POOL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
  state = { transactionPoolMap: {} };

  fetchTransactionPoolMap = () => {
    fetch(`${document.location.origin}/api/transaction-pool-map`)
      .then((res) => res.json())
      .then((jsonData) => this.setState({ transactionPoolMap: jsonData }));
  };

  fetchMineTransactions = () => {
    fetch(`${document.location.origin}/api/mine-transaction`)
    .then(res => {
      if(res.status === 200) {
        alert('success');
        history.push('/blocks');
      } else {
        alert('The mine-transactions block request did not complete.');
      }
    })
  }

  componentDidMount() {
    this.fetchTransactionPoolMap();
    this.fetchPoolMapInterval = setInterval(
      () => this.fetchTransactionPoolMap(),
      POOL_INTERVAL_MS
    );
  }

   componentWillUnmount() {
     clearInterval(this.fetchPoolMapInterval);
   }

  render() {
    return (
      <div className="TransactionPool">
        <div>
          <Link to="/">Home</Link>
        </div>
        <h3>Transaction Pool</h3>
        {Object.values(this.state.transactionPoolMap).map((transaction) => {
          return (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          );
        })}
        <hr />
        <Button
        bsStyle="danger"
        onClick={this.fetchMineTransactions}
        >Mine the Transaction
        </Button>
      </div>
    );
  }
}

export default TransactionPool;
