import React, { Component } from 'react';
import ConverterForm from './components/ConverterForm.js';
import BitcoinInfo from './components/BitcoinInfo.js';
import Spinner from './components/Spinner.js';

import './App.css';

const config = {
  currencies: ['USD', 'EUR', 'RUB', 'GBP']
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currencyCache: [],
      currency: null,
      loading: false,
      showBtc: false,
    }
  }

  componentDidMount() {
    const currencyName = 'USD';
    this.setState({loading: true});
    this.fetchCurrencyRate(currencyName);
  }

  currencyChangeHandler = (e) => {
    const currencyName = e.target.value;

    //look up at cache first.
    const currency = this.state.currencyCache.find(c => c.name === currencyName);

    if (currency) {
      this.setState({currency});
      return;
    }

    this.setState({loading: true});
    this.fetchCurrencyRate(currencyName);
  }

  fetchCurrencyRate = (currencyName) => {
    return fetch(`http://cb.am/latest.json.php?currency=${currencyName}`)
      .then(res => res.json())
      .then(res => {
        const newCurrency = {
          name: currencyName,
          rate: res[currencyName]
        };

        this.setState({
          currency: newCurrency,
          currencyCache: [newCurrency, ...this.state.currencyCache],
          loading: false,
        });
      })
  }


  render() {
    if (!this.state.currency)
      return <h2>Loading...</h2>;

    return (
      <div className="App">
        <h1>Rate calculator</h1>
        
        <div className="rate-bar">
          <span>Convert AMD to:</span>
          <div>
            <select
              onChange={this.currencyChangeHandler}
            >
              {
                config.currencies.map((currency, index) => {
                  return <option key={index}>{currency}</option>
                })
              }
            </select>
            { this.state.loading && <Spinner /> }
            <p>(1 {this.state.currency.name} = {this.state.currency.rate} AMD)</p>
          </div>
        </div>
        <ConverterForm 
          currency={this.state.currency}
        />
        
        <div className="btc-container">
          <a href="#"
            onClick={() => this.setState({showBtc: !this.state.showBtc})}
          >{this.state.showBtc? "Hide Bitcoin rate" : "Show Bitcoin rate"}</a>
          
          {
            this.state.showBtc 
            && <div><hr /><BitcoinInfo/></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
