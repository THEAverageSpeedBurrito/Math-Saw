import React from 'react';
import AppBar from 'material-ui/AppBar';
import logo from '../assets/CircularSaw.svg'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

const NavBar = React.createClass({

  getInitialState() {
    return ({
      export: this.props.export
    })
  },

  render: function () {

    return (
      <AppBar
        title="Math Saw"
        style={this.props.style.navstyle}
        titleStyle={this.props.style.titlestyle}
        showMenuIconButton={false}
        iconElementRight={<Link to="/"><RaisedButton label="Home"/></Link>}
      />
    )
  },

})


export default NavBar;
