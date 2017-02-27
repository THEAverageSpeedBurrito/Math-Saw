import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
var {Cut, Stock} = require('./js/constructors');

import NavBar from '../components/navbar'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

var Editor = React.createClass({
  getInitialState: function () {
    return ({
      stock: [new Stock(8, 4), new Stock(10, 4)],
      components: [],
      length: '',
      width: ''
    })
  },

  render: function() {
    return (
      <div>
        <NavBar/>
        <div className="container">
        <div className="editor">
            <form onSubmit={this.addComponent}>
              <TextField
                hintText="Length"
                value={this.state.length}
                onChange={this.setLength}
              />
              <TextField
                hintText="Width"
                value={this.state.width}
                onChange={this.setWidth}
              />
              <br/>
              <RaisedButton
                label="Submit"
                type="submit"
              />
            </form>
            <div id="render">
              {
                this.state.stock.map((obj) => {
                  var stockStyle = {
                    height: `${obj.length * 10}px`,
                    width: `${obj.width * 10}px`,
                  }
                  return (
                    <div className="stock" style={stockStyle}/>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
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

    this.state.components.push(new Cut(parseInt(length), parseInt(width)))

    this.setState({
      length: '',
      width: '',
    })
  }
})

export default Editor;
