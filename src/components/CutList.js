

import React from 'react';
var {Component, Stock} = require('./js/constructors');
var Setup = require('./js/setup');

const CutList = React.createClass({
  getInitialState: function () {
    return {
      stock: [],
      components: []
    };
  },

  componentDidMount: function () {
    var stock = new Stock(8, 4);
    var component = new Component(5, 2);

    this.state.stock.push(stock);
    console.log(this.state.stock);
    this.state.components.push(component);

    Setup(this.state.stock, this.state.components);

  },

  render: function(){

    return(
      <div className="cut-list">
      </div>
    );
  }
});

export default CutList;
