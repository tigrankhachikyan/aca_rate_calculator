import React, { Component } from 'react';
import Spinner from './Spinner.js';

import './BitcoinInfo.css';

export default class BitcoinInfo extends Component {
  constructor() {
    super();
    this.state = {
      rate: 'Loading...',
      loading: false,
      _timerId: null,
      error: null,
    }
  }

  componentDidMount() {
    this._fetch_btc();

    const _timerId = setInterval(this._fetch_btc, 3 * 60 * 1000);
    this.setState({_timerId});
  }

  componentWillUnmount() {
    clearInterval(this.state._timerId);
  }

  _fetch_btc = () => {
    if (this.state.loading) return;

    this.setState({loading: true});

    fetch('http://cb.am/latest.json.php?coins&currency=BTC')
      .then(res => res.json())
      .then(res => this.setState({
        rate: res["BTC"],
        loading: false
      }))
      .catch(err => {
        this.setState({
          error: "Error: please try again... ",
          loading: false
        })
      })
  }

  render() {
    return (
      <div>
        <span>Current Bitcoin rate:
          <span className="rate bold">{this.state.rate}</span>
        </span>
        {
          this.state.error && 
          <span style={{color: "red"}}>{this.state.error}</span>
        }
        {
          this.state.loading 
          ? <Spinner size={15} />
          : <a href="#" className="refresh-link italic"
              onClick={this._fetch_btc}
            >Refresh</a>
        }
        <p>(BTC rate automatically will be updated every 3 minutes)</p>
      </div>
    )
  }
}