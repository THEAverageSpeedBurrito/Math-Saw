import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import CompRender from './compRender';
import {List, ListItem} from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ActionHome from 'material-ui/svg-icons/action/home';

var style = {
  paper: {
    padding: 0,
    boxShadow: '0 0 10px 3px rgba(0,0,0,0.1)',
    margin: '15px -10px 15px -10px',
    height: 179,
    boxShadow: '0 0 10px 0px rgba(0,0,0,0.2)'
  },
  list: {
    padding: 0,
    height: 1000
  },
  innerList: {
    height: 53,
    padding: '10px 10px 10px 50px',
    margin: '10px 0 10px 0'
  },
  iconStyle: {
    margin: '0 0 0 10px',
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
                  <ListItem primaryText={this.state.comp.length} secondaryText="Name" innerDivStyle={style.innerList}/>
                  <ListItem primaryText={this.state.comp.width} secondaryText="Width" innerDivStyle={style.innerList}/>
                  <ListItem primaryText={this.state.comp.length} secondaryText="Depth" innerDivStyle={style.innerList}/>
                </List>
              </Paper>
            </Col>
            <Col sm={6} md={3}>
              <Paper style={style.paper}>
                <List style={style.list}>
                  <ListItem primaryText="Component" secondaryText="Width" innerDivStyle={style.innerList} leftIcon={<ActionHome style={style.iconStyle}/>}/>
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
        </Row>
    )
  }
});

export default Comp;
