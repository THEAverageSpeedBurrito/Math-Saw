import React from 'react';
var {Component, Stock} = require('./js/constructors');
import { Container, Row, Col} from 'react-grid-system';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

//Components
import NavBar from './navbar';
import Export from './export';
import Comp from './component'

var style = {
  navstyle: {
    backgroundColor: "#6200B3",
    color: "#114B5F",
    position: 'fixed',
    top: '0',
    boxShadow: 'none',
  },
  titlestyle: {
    color: 'white',
    fontFamily: 'VT323, monospace',
    fontSize: 50
  },
  logo: {
    height: 500,
    width: 500,
  },
  input: {
    margin: 10,
    width: 200
  },
  paper: {
    padding: 10,
    margin: '20px 0 20px 0',
    boxShadow: '0 0 10px 3px rgba(0,0,0,0.1)',
  },
  expButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: "slategray"
  }
}


var Editor = React.createClass({
  getInitialState: function () {
    return ({
      stock: [new Stock(48, 4)],
      components: [
        new Component(4, 48),
        new Component(2, 48),
        new Component(2, 48),
        new Component(4,1),
        new Component(8,4),
        new Component(3,2)
      ],
      length: '',
      width: '',
      export: false,
      style: style
    })
  },

  render: function() {

    var which;

    var render;
    if(this.state.export){
    render =  <Export
          components={this.state.components}
          stock={this.state.stock}
        />
    }else{
      render = (
        <div>
          <Row>
            <Col sm={12} className="center">
              <h2>Components</h2>
            </Col>
          </Row>
          {
            this.state.components.map((component) => {
              return (
                <Comp component={component}/>
              )
            })
          }
        </div>
      )
    }

    var expLabel;
    if(!this.state.export){
      expLabel = "Finish Design"
    }else{
      expLabel = "Keep Editing"
    }
    return (
      <main>
        <NavBar style={this.state.style} export={this.state.export}/>
        <Container className="container">
          <Paper style={style.paper}>
            <Row id="inputfields" className="center">
              <Col sm={12}>
                <input
                style={style.input}
                placeholder="Length"
                onChange={this.setLength}
                value={this.state.length}
                />
                <input
                placeholder="Width"
                onChange={this.setWidth}
                value={this.state.width}
                style={style.input}
                />
                <input
                placeholder="Depth"
                onChange={this.setDepth}
                value={this.state.depth}
                style={style.input}
                />
              </Col>
              <Col sm={12}>
                <RaisedButton
                  label="Add Component"
                  onClick={this.addComponent}
                />
              </Col>
            </Row>
          </Paper>

          {render}

        </Container>
        <RaisedButton label={expLabel} style={style.expButton} onClick={this.renderCuts} />
      </main>
    )
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
    this.state.components[this.state.components.length - 1].id = this.state.components.length - 1

    this.setState({
      length: '',
      width: '',
    })

  },

  //take array of object classes
  //returns array of canvas objects to br rendered
  renderCuts: function () {
    var stock = this.state.stock;
    var components = this.state.components;

    this.setState({
      export: !this.state.export
    })
  },


})

export default Editor;
