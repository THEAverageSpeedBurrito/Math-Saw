import React from 'react';
import AppBar from 'material-ui/AppBar';

const NavBar = React.createClass({
  getIntitalState: function () {
    return null;
  },

  render: function () {
    var navStyle = {
      backgroundColor: "#114B5F",
      boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.2)",
      borderTop: '3px solid #FFF056'
    }

    return (
      <AppBar
        title="Math Saw"
        style={navStyle}
      />
    )
  }
})

export default NavBar;
