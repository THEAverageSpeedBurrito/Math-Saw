import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'

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
  header: {
    backgroundColor: '#3B0086',
    paddingTop: 75,
    color: 'white'
  }
}

const Landing = React.createClass({
  getInitialState: function () {
    var height = window.innerHeight;
    var width = window.innerWidth;
    style.header.height = height;
    style.header.width = width;

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
      <AppBar
        title="Math Saw"
        className=""
        style={this.state.style.navstyle}
        titleStyle={this.state.style.titlestyle}
        showMenuIconButton={false}
      />
        <div style={this.state.style.header}>
          <div className="container">
            Welcome to Math Saw
            <br/>
            <Link to="/editor">
              <RaisedButton label="Lets get editing!"/>
            </Link>
          </div>
        </div>
      </div>
    )
  },

  setFullWidth() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    style.header.height = height;
    style.header.width = width;

    this.setState({
      style: style
    })
  }
});

export default Landing;
