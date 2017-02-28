import React from 'react';
import AppBar from 'material-ui/AppBar';

const NavBar = React.createClass({
  getIntitalState: function () {
    return {
      logged: false,
    };
  },

  render: function () {
    var navStyle = {
      backgroundColor: "#FFFFFF",
      color: "#114B5F",
    }
    var titleStyle = {
      color: '#6290C8'
    }

    var navbar;

    return (
      <AppBar
        title="Math Saw"
        style={navStyle}
        titleStyle={titleStyle}
        showMenuIconButton={false}
      />
    )
  }
})

export default NavBar;
