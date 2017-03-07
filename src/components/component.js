import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import CompRender from './compRender';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';


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
    padding: '10px 10px',
    margin: '10px 0 10px 0'
  },
  innerListAction: {
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

  render() {
    var comp = this.state.comp;
    var key = comp.name.replace(' ', '');
    return (
        <Col sm={12} md={6} lg={4} key={key}>
          <Card style={style.card}>
            <CardMedia id={key}>
              <CompRender length={this.state.comp.length} width={this.state.comp.width} container={key}/>
            </CardMedia>
            <Divider/>
            <CardTitle title={comp.name} />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <RaisedButton label="Edit"/>
              <RaisedButton label="Delete"/>
            </CardActions>
          </Card>
        </Col>
    )
  }
});

export default Comp;
