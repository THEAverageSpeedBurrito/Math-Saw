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
      components: [],
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
        <NavBar/>
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
                    <th>
                      <td>Length</td>
                      <td>Width</td>
                    </th>
                  </thead>
                    {
                      this.state.components.map((comp) => {
                        return (
                          <tr>
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

    this.setState({
      length: '',
      width: '',
    })

    console.log(this.state.components);
  },

  //take array of object classes
  //returns array of canvas objects to br rendered
  renderCuts: function () {
    var stock = this.state.stock;
    var components = this.state.components;

    console.log(stock, components);

    this.setState({
      export: true
    })
  },

  changeState: function () {
    this.setState({
      render: !this.state.render
    });
    console.log(this.state.render);
  }
})

export default Editor;
