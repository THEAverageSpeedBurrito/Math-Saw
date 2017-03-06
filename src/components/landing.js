import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import logo from '../assets/CircularSaw.svg'

var style = {
  navstyle: {
    backgroundColor: "#0365B5",
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
  upper: {
    backgroundColor: '#353531',
    color: 'white'
  },
  lower: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 200,
    backgroundColor: '#0365B5',
    zIndex: '-1'
  },
  logo: {
    height: 500,
    width: 500,
  }
}

const Landing = React.createClass({
  getInitialState: function () {
    var height = window.innerHeight;
    var width = window.innerWidth;
    style.upper.height = height;
    style.upper.width = width;
    style.lower.height = height;
    style.lower.width = width;

    return ({
      style: style,
      title: '',
    })
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.setFullWidth);
  },

  render: function() {
    return (
      <div>
        <div style={this.state.style.upper}>
          <div className="container center">
            <img src={logo} style={this.state.style.logo} alt="Circular saw"/>
          </div>
          <div style={this.state.style.lower}/>
        </div>
      </div>
    )
  },

  setFullWidth() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    style.upper.height = height;
    style.upper.width = width;
    style.lower.height = height;
    style.lower.width = width;

    this.setState({
      style: style
    })
  }
});

export default Landing;
