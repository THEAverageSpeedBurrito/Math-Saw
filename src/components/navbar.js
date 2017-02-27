import React from 'react';
import AppBar from 'material-ui/AppBar';

const NavBar = React.createClass({
  getIntitalState: function () {
    return null;
  },

  render: function () {
    return (
      <AppBar
        title="Math Saw"
      />
    )
  }
})

export default NavBar;
