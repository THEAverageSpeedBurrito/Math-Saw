import React from 'react';
import AppBar from 'material-ui/AppBar';
import logo from '../assets/CircularSaw.svg'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

const NavBar = React.createClass({

  componentDidMount: function () {

  },

  render: function () {

    var navbar;

    return (
      <AppBar
        title="Math Saw"
        style={this.props.style.navstyle}
        titleStyle={this.props.style.titlestyle}
        showMenuIconButton={false}
      />
    )
  }
})

export default NavBar;
