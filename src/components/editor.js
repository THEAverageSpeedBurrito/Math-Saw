import React from 'react';
var {Component, Stock} = require('./js/constructors');
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system';


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
      export: false
    })
  },

  render: function() {

    var which;

    if(this.state.export) {
      which = <Export
        components={this.state.components}
        stock={this.state.stock}
      />
    }else{
      which=
      <main>
        <NavBar/>
        <Container>
  <Row>
    <Col sm={4}>
      One of three columns
    </Col>
    <Col sm={4}>
      One of three columns
    </Col>
    <Col sm={4}>
      One of three columns
    </Col>
  </Row>
</Container>
      </main>
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
  },

  changeState: function () {
    this.setState({
      render: !this.state.render
    });
    console.log(this.state.render);
  }
})

export default Editor;
