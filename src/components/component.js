import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import CompRender from './compRender';
import {List, ListItem} from 'material-ui/List';

var style = {
  paper: {
    padding: 10,
    margin: '10px 0 10px 0',
    boxShadow: '0 0 10px 3px rgba(0,0,0,0.1)',
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
      <Paper style={style.paper}>
        <Row>
          <Col sm={12} md={4}>
            <List>
              <ListItem primaryText={this.state.comp.length} secondaryText="Length" />
              <ListItem primaryText={this.state.comp.width} secondaryText="Width" />
              <ListItem primaryText={this.state.comp.length} secondaryText="Depth" />
            </List>
          </Col>
          <Col sm={12} md={4}>
            <CompRender
            length={this.state.comp.length}
            width={this.state.comp.width}
            />
          </Col>
          <Col sm={12} md={4}>
            delete
            edit
          </Col>
        </Row>
      </Paper>
    )
  }
});

export default Comp;
