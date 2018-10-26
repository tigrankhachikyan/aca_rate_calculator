import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './ConverterForm.css';

export default class ConverterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    }
  }
  
  render() {
    const {name, rate} = this.props.currency;

    const result = this.state.input / rate;
    return (
      <div className="converter-form">
        <input 
          type="number"
          defaultValue={this.state.input}
          onChange={e => this.setState({input: e.target.value})}
        />
        {
          <span>AMD = {result.toFixed(2)} {name}</span>
        }
      </div>
    );
  }
}

ConverterForm.propTypes = {
  currency: Proptypes.object.isRequired
}