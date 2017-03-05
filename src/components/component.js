import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import CompRender from './compRender';

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
            <CompRender
              length={this.state.comp.length}
              width={this.state.comp.width}
            />
          </Col>
          <Col sm={12} md={4}>
            <p>Length: {this.props.component.length}</p>
            <p>Width: {this.props.component.width}</p>
            <p>Area: {this.props.component.area}</p>
          </Col>
        </Row>
      </Paper>
    )
  }
});

export default Comp;
