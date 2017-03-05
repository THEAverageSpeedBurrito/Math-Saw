import React from 'react';
var {Component, Stock} = require('./js/constructors');
import { Container, Row, Col} from 'react-grid-system';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';



//Components
import NavBar from './navbar';
import Export from './export';



var Editor = React.createClass({
  getInitialState: function () {
    return ({
      stock: [new Stock(48, 4)],
      components: [
        new Component(3, 20),
        new Component(1, 20),
        new Component(4, 8),
        new Component(2, 2),
        new Component(8, 3),
        new Component(2, 2),
        new Component(1, 8),
        new Component(4, 10),
        new Component(1, 10),
        new Component(3, 11),
        new Component(1, 3),
        new Component(10, 3),
        new Component(1, 8),
        new Component(4, 25),
        new Component(4, 10),
      ],
      length: '',
      width: '',
      export: false
    })
  },

  render: function() {

    var which;

    const style = {
      paper: {
        display: 'inline-block',
        float: 'left',
        margin: '0 32px 16px 0',
        padding: '10px',
        width: '100%'
      },
    };

    var render;
    if(this.state.export){
    render =  <Export
          components={this.state.components}
          stock={this.state.stock}
        />
    }

    return(
      <main>
        <Container className="container">
          <Row>
            <Col xs={12} sm={6}>
              <Paper style={style.paper}>
                <TextField
                  hintText="Length"
                  onChange={this.setLength}
                  value={this.state.length}
                />
                <TextField
                  hintText="Width"
                  onChange={this.setWidth}
                  value={this.state.width}
                />
                <br/>
                <RaisedButton
                  label="Add Component"
                  onClick={this.addComponent}
                />
              </Paper>
            </Col>
            <Col xs={12} sm={6}>
              <Paper style={style.paper}>
                <table>
                  <thead>
                    <tr>
                      <td>Length</td>
                      <td>Width</td>
                    </tr>
                  </thead>
                    {
                      this.state.components.map((comp) => {
                        return (
                          <tr key={comp.id}>
                            <td>{comp.length}</td>
                            <td>{comp.width}</td>
                          </tr>
                        )
                      })
                    }
                </table>
                <RaisedButton
                  label="Render Cuts"
                  onClick={this.renderCuts}
                />
              </Paper>
            </Col>
          </Row>
        </Container>
        {render}
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
      export: true
    })
  },

  changeState: function () {
    this.setState({
      render: !this.state.render
    });
  }
})

export default Editor;
