import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import CompRender from './compRender';
import {List, ListItem} from 'material-ui/List';

var style = {
  paper: {
    padding: 0,
    boxShadow: '0 0 10px 3px rgba(0,0,0,0.1)',
    margin: '10px 0 10px 0',
    height: 179
  },
  list: {
    padding: 0,
    height: 1000
  },
  innerList: {
    height: 53,
    padding: 10,
    margin: '10px 0 10px 0'
  }
}

const Comp = React.createClass({
  getInitialState() {
    return ({
      comp: this.props.component
    })
  },

  componentWillMount() {

  },

  render() {
    return (
        <Row>
            <Col sm={6} md={2}>
              <Paper style={style.paper} zDepth={0}>
                <List style={style.list}>
                  <ListItem primaryText={this.state.comp.length} secondaryText="Length" innerDivStyle={style.innerList}/>
                  <ListItem primaryText={this.state.comp.width} secondaryText="Width" innerDivStyle={style.innerList}/>
                  <ListItem primaryText={this.state.comp.length} secondaryText="Depth" innerDivStyle={style.innerList}/>
                </List>
              </Paper>
            </Col>
            <Col sm={6} md={3}>
              <Paper style={style.paper}>
                <List style={style.list}>
                  <ListItem primaryText="Component" secondaryText="Width" innerDivStyle={style.innerList}/>
                  <ListItem primaryText="Delete" secondaryText="Width" innerDivStyle={style.innerList}/>
                  <ListItem primaryText="Count" secondaryText="Depth" innerDivStyle={style.innerList}/>
                </List>
              </Paper>
            </Col>
            <Col sm={12} md={7}>
              <Paper style={style.paper}>
                  <CompRender length={this.state.comp.length} width={this.state.comp.width}/>
              </Paper>
            </Col>
            <hr/>
        </Row>
    )
  }
});

export default Comp;
