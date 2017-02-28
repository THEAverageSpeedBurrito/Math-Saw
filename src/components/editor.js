import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
var {Component, Stock} = require('./js/constructors');

//Components
import NavBar from './navbar';
import Export from './export';


var Editor = React.createClass({
  getInitialState: function () {
    return ({
      stock: [new Stock(48, 4)],
      components: [],
      length: '',
      width: '',
      render: true
    })
  },

  render: function() {

    var which;

    if(this.state.render) {
      which = <Export
        components={this.state.components}
        stock={this.state.stock}
      />
    }else{
      which = <p>I contain all the relevant data</p>
    }

    return which
  },

  setLength: function (event) {
    let newVal = event.target.value;
    this.setState({length: newVal});
  },

  setWidth: function (event) {
    let newVal = event.target.value;
    this.setState({width: newVal});
  },

  addComponent: function (event) {
    event.preventDefault()

    var {length, width} = this.state;

    this.state.components.push(new Component(parseInt(length), parseInt(width)))

    this.setState({
      length: '',
      width: '',
    })
  },

  //take array of object classes
  //returns array of canvas objects to br rendered
  renderFit: function () {
    var stock = this.state.stock;
    var components = this.state.components;
  }
})

export default Editor;
